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

// This script basically takes care of the passing all the stuff to PhantomJS.

var child_process = require('child_process');
var fs = require('fs');
const paths = require('./paths.js');


/* Renders JSON data for a ECharts plot into a PNG file.

   Parameters:
     jsonData - (string) the JSON data required by ECharts
     filename - (string) desired output file name for the PNG file
     width    - (number) width of the PNG file in pixels
     height   - (number) height of the PNG file in pixels

   Returns:
     object that contains two members:
       success - (boolean) indicates success of the rendering process
       filename - (string) filename of the output, only present after successful
                  rendering
       failure - (string) reason for render failure; only present after failed
                 rendering, may be cryptic and is not necessarily human-friendly
*/
exports.render = function(jsonData, filename, width, height) {
  if (!filename) {
    filename = 'phantom-render-' + Date.now() + '.png';
  }
  if (typeof jsonData !== 'string') {
    return {
      success: false,
      failure: 'json-not-a-string'
    };
  }
  if (typeof filename !== 'string') {
    return {
      success: false,
      failure: 'filename-not-a-string'
    };
  }
  const parsed_width = parseInt(width, 10);
  if (isNaN(parsed_width) || parsed_width <= 0) {
    width = undefined;
  } else {
    width = parsed_width;
  }
  const parsed_height = parseInt(height, 10);
  if (isNaN(parsed_height) || parsed_height <= 0) {
    height = undefined;
  } else {
    height = parsed_height;
  }

  const configDataFile = 'config-data-' + Date.now() + '.json';
  fs.writeFileSync(configDataFile, jsonData, {mode: 0o644, flag: 'w'});

  console.log("Starting PhantomJS ...\n(This might take one or two seconds.)");
  // Options for spawned child process:
  // Set timeout to 15 seconds and kill signal to SIGKILL, so that process
  // gets killed after timeout.
  var options =  {timeout: 15000, killSignal: 'SIGKILL'};
  // Set offscreen rendering for ARM.
  if (process.arch === 'arm') {
    options.env = {QT_QPA_PLATFORM: "offscreen"};
  }
  var stdout = child_process.execFileSync(paths.phantomjs,
    //arguments: render.js template.html plot-data.js output.png
    [paths.renderJs, paths.usableTemplate, configDataFile, filename, width, height],
    // Options: See above.
    options);

  console.log("=> PhantomJS output: " + stdout);

  // Delete JSON data file with plot data.
  fs.unlink(configDataFile, function(err) {
    if (err) {
      console.warn('Could not unlink JSON file ' + configDataFile + '!');
    }
  });

  // File should usually exist, but let's be on the safe side here.
  if (fs.existsSync(filename)) {
    return {
      success: true,
      filename: filename
    };
  } else {
    return {
      success: false,
      failure: 'phantomjs-renderer'
    };
  }
};
