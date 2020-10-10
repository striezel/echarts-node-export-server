/*
    ECharts offline image export server with Node.js
    Copyright (C) 2018, 2020  Dirk Stolle

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

// This module contains an utility class that keeps track of some common paths.

var path = require('path');

const basePathParts = __dirname.split(path.sep);

const paths = {
  basePathParts: basePathParts,

  // absolute path for renderPhantom.js
  renderJs: basePathParts.concat(['renderPhantom.js']).join(path.sep),

  // path of the basic HTML template (Do not use for rendering, it will fail!)
  template: basePathParts.concat(['template.html']).join(path.sep),

  // absolute path for prepared template.html (Works for rendering.)
  usableTemplate: basePathParts.concat(['template-real.html']).join(path.sep),

  // absolute path for PhantomJS executable
  phantomjs: basePathParts.concat(['node_modules', 'phantomjs-prebuilt', 'lib', 'phantom', 'bin', 'phantomjs']).join(path.sep),

  // absolute path of the current ECharts script
  echartsJs: basePathParts.concat(['echarts-en.v4.9.0.min.js']).join(path.sep)
};

// On Windows systems we need the .exe extension to detect the file properly.
if (process.platform == 'win32') {
  paths.phantomjs = basePathParts.concat(['node_modules', 'phantomjs-prebuilt', 'lib', 'phantom', 'bin', 'phantomjs.exe']).join(path.sep);
}
// On ARM (e.g. Raspberry Pi) there is no phantomjs-prebuilt version. We have to use the APT package instead.
else if (process.arch == 'arm') {
  paths.phantomjs = '/usr/bin/phantomjs';
}

module.exports = paths;
