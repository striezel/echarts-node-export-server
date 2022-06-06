/*
    ECharts offline image export server with Node.js
    Copyright (C) 2018, 2021, 2022  Dirk Stolle

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

var fs = require('fs');
const { createCanvas } = require('canvas');
const echarts = require('./echarts.v5.3.2.min.js');
const paths = require('./paths.js');
const uuidv4 = require('uuid/v4');


/* Renders JSON data for a ECharts plot into a SVG file.

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
function render_svg(jsonData, filename, width, height) {
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: width,
    height: height
  });

  jsonData.animation = false;
  chart.setOption(jsonData);

  const svg_data = chart.renderToSVGString();
  fs.writeFileSync(filename, svg_data, {encoding: 'utf8', mode: 0o644, flag: 'w'});
  return {
    success: true,
    filename: filename
  };
}

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
function render_png(jsonData, filename, width, height) {
  const canvas = createCanvas(width, height);
  const chart = echarts.init(canvas);

  jsonData.animation = false;
  chart.setOption(jsonData);

  const data = canvas.toBuffer('image/png');
  fs.writeFileSync(filename, data, {mode: 0o644, flag: 'w'});
  return {
    success: true,
    filename: filename
  };
}

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
  const unique_id = uuidv4();

  if (!filename) {
    filename = 'graph-' + unique_id + '.svg';
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
  // Handle image size and fallback to 700 x 400, if necessary.
  width = width || parseInt(width, 10) || 700;
  height = height || parseInt(height, 10) || 400;

  const json_object = JSON.parse(jsonData);
  if (filename.endsWith('.png')) {
    render_png(json_object, filename, width, height);
  } else if (filename.endsWith('.svg')) {
    render_svg(json_object, filename, width, height);
  } else {
    return {
      success: false,
      failure: "Only PNG or SVG files can be rendered."
    };
  }

  // File should usually exist, but let's be on the safe side here.
  if (fs.existsSync(filename)) {
    return {
      success: true,
      filename: filename
    };
  } else {
    return {
      success: false,
      failure: 'echarts-renderer'
    };
  }
};
