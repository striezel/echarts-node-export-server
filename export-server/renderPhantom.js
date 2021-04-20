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

var page = require('webpage').create();
var system = require('system');
var fs = require('fs');

if (system.args.length !== 6) {
  console.log('Usage: phantom renderPhantom.js template.html config.json output.png width height');
  phantom.exit(1);
} else {
  // Get all file names from command line parameters.
  var template = system.args[1];
  var templatePath = fs.absolute(template);
  var configData = system.args[2];
  var configDataPath = fs.absolute(configData);
  var outFile = system.args[3];
  var width = parseInt(system.args[4], 10);
  var height = parseInt(system.args[5], 10);

  // Read the JSON data for the ECharts plot.
  var configString = fs.read(configDataPath);
  var chartJson = {};
  try {
    chartJson = JSON.parse(configString);
  } catch (e) {
    console.log('Could not parse config data into JSON!');
    phantom.exit(1);
  }

  // Add white background colour, if none is set.
  if (!chartJson.backgroundColor) {
    chartJson.backgroundColor = '#fff';
  }
  // Disable animation to render immediately.
  chartJson.animation = false;

  // Handle image size and fallback to 700 x 400, if necessary.
  width = width || parseInt(chartJson.imageWidth, 10) || 700;
  height = height || parseInt(chartJson.imageHeight, 10) || 400;

  page.onLoadFinished = function (status) {
    // Create the chart by making a new plot with the given data.
    console.log('Creating chart ...');
    page.evaluate(function (chartJson, width, height) {
      document.getElementById('plot').style.width = width + 'px';
      document.getElementById('plot').style.height = height + 'px';
      var chart = echarts.init(document.getElementById('plot'));
      chart.setOption(chartJson);
    }, chartJson, width, height);

    // The evaluation and drawing is done, now render it to PNG.
    console.log('rendering image...');
    page.render(outFile, {
      format: 'png'
    });
    // Success. (Unless someone specified useless JSON data.)
    phantom.exit(0);
  };

  // Setting content of the page directly is effectively the same as a reload.
  page.content = fs.read(templatePath);
}
