/*
    ECharts offline image export server with Node.js
    Copyright (C) 2018, 2021  Dirk Stolle

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

"use strict";

const fs = require('fs');
const http = require('http');
const path = require('path');
const paths = require('./paths.js');
const phantomize = require('./phantomize.js');
const url = require('url');
const uuidv4 = require('uuid/v4');

// Use hostname from environment variable HOST, if it is set.
const hostname = process.env.HOST || 'localhost';
// Use port from environment variable PORT, if it is set and valid.
const parsedPort = parseInt(process.env.PORT);
if (process.env.PORT) {
  if (isNaN(parsedPort)) {
   console.log('Warning: PORT environment variable is not a number, using port 3000!');
  } else if (parsedPort <= 0 || parsedPort > 65535) {
   console.log('Warning: PORT environment variable is not a number between 1 and 65535, using port 3000!');
  } else if (parsedPort < 1024) {
   // Unless user is root or admin, binding to well-known ports is usually denied by the OS.
   console.log('Warning: Binding to ports below 1024 may require root / administrative privileges!');
  }
}
const port = (parsedPort && parsedPort > 0 && parsedPort < 65536) ? parsedPort : 3000;

// ** Preparation, step 1: **
// Find the PhantomJS executable. It is usually located in the node_modules
// directory as ./node_modules/phantomjs-prebuilt/lib/phantom/bin/phantomjs.
if (!fs.existsSync(paths.phantomjs)) {
  // This whole server is pointless without PhantomJS binary, so quit here.
  console.error("There is no PhantomJS binary in " + paths.phantomjs + '!');
  if (process.arch !== 'arm' ) {
    console.info("Please check that you have the NPM module phantomjs-prebuilt installed.");
    console.info("You can do this via\n\n    npm install\n\nwhich should install "
      + "all required dependencies for this application, including PhantomJS.");
    console.info("You could also just install PhantomJS by typing\n\n");
    console.info("    npm install --save phantomjs-prebuilt");
  } else {
    console.info("Please check that you have the APT package phantomjs installed.");
    console.info("You can do this via\n\n    sudo apt-get install phantomjs");
    console.info("\n\nwhich should install PhantomJS.");
  }
  process.exit(1);
}
console.info("=> PhantomJS binary found in " + paths.phantomjs + '.');

// ** Preparation, step 2: **
// Prepare the template file for use:
// Replace placeholder in template with actual script path.

/* Adjusts absolute path for unse in HTML on Windows systems. Returns argument
   unchanged on other platforms.
*/
function localPath(absolutePath) {
  if (process.platform == 'win32') {
    // See https://blogs.msdn.microsoft.com/ie/2006/12/06/file-uris-in-windows/
    // for proper file URI syntax on Windows.
    // The following line basically replaces ALL occurrences of backward slash
    // with forward slash and all space characters with the URL-encoded version
    // for that (%20). We cannot simply do a String.replace(), because that
    // only replaces the first occurrence.
    return '/' + absolutePath.split(path.sep).join('/').split(' ').join('%20');
  } else {
    return absolutePath;
  }
}

try {
  var templateContent = fs.readFileSync(paths.template);
  templateContent = templateContent.toString().replace('{{absoluteEChartsJsPath}}', localPath(paths.echartsJs));
  fs.writeFileSync(paths.usableTemplate, templateContent, {mode: 0o644, flag: 'w'});
} catch (e) {
  // Something went wrong while writing the file.
  console.error('The render template could not be created!');
  process.exit(2);
}
console.info("=> Render template has been created in " + paths.usableTemplate + '.');

const server = http.createServer(function(req, res) {
  // ---- Handle PNG file requests ----
  const file = url.parse(req.url);
  if (file.pathname !== '/') {
    // It is a file request.
    let realPath = file.pathname.slice(1);
    // Avoid directory traversal.
    if ((realPath.indexOf('/') !== -1) || (realPath.indexOf('\\') !== -1)) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'text/plain');
      return res.end('Forbidden');
    }
    // Avoid access to any non-PNG files.
    if (!realPath.endsWith('.png')) {
      res.statusCode = 403;
      res.setHeader('Content-Type', 'text/plain');
      return res.end('Only requests to PNG files are allowed.');
    }
    var s = fs.createReadStream(realPath);
    s.on('open', function () {
        res.setHeader('Content-Type', 'image/png');
        res.statusCode = 200; // 200 == OK
        s.pipe(res);
    });
    s.on('end', function () {
        res.end();
    });
    s.on('error', function () {
        res.setHeader('Content-Type', 'text/plain');
        res.statusCode = 404;
        res.end('Not found');
    });
    return;
  }

  // ---- Handle plot generation requests ----

  // Only post request shall be allowed.
  if (req.method !== 'POST') {
    res.statusCode = 405; // 405 == Method not allowed
    res.setHeader('Content-Type', 'text/plain');
    res.end('Only POST requests are allowed!\n');
    return;
  }

  var body = '';
  var killed = false;
  // Gather data.
  req.on('data', function (data) {
    body += data;
    // Avoid flooding the server with large requests. Limit is 5 MB (mega as in
    // SI prefixes).
    if (body.length > 5000000) {
      res.statusCode = 413; // 413 == Payload Too Large
      res.setHeader('Content-Type', 'text/plain');
      res.end('Request size exceeds reasonable limits!\n');
      req.connecion.destroy();
      killed = true;
      return;
    }
  });

  // Event gets triggered when there is no more data from the client.
  req.on('end', function () {
    if (killed) {
      return;
    }
    body = body.trim();
    try {
      // Try to parse into JSON to check validity.
      const jsObject = JSON.parse(body);
    } catch (e) {
        res.statusCode = 400; // 400 == Bad Request
        res.setHeader('Content-Type', 'text/plain');
        res.end('Post data is not valid JSON!\n');
        killed = true;
        return;
    }
    if (killed) {
      return;
    }
    // Render file with PhantomJS.
    const filename = 'graph-'+ uuidv4() + '.png';
    const result = phantomize.render(body, filename, req.headers["x-image-width"], req.headers["x-image-height"]);
    if (result.success) {
      res.statusCode = 200; // 200 == OK
    } else {
      res.statusCode = 500; // 500 == Internal Server Error
    }
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(result));
  });
});

// Send 400 Bad Request, if client errored out.
server.on('clientError', function(err, socket) {
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(port, hostname, function() {
  console.log('=> Server running at http://' + hostname + ':' +port + '/');
});
