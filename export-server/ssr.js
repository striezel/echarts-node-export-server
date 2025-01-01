/*
    ECharts offline image export server with Node.js
    Copyright (C) 2018, 2021, 2022, 2023, 2024, 2025  Dirk Stolle

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

const { createCanvas } = require('canvas');
const echarts = require('./echarts.v5.5.1.min.js');


/* Renders JSON data for a ECharts plot into a SVG image.

   Parameters:
     jsonData - (string) the JSON data required by ECharts
     width    - (number) width of the SVG image in pixels
     height   - (number) height of the SVG image in pixels

   Returns:
     object that contains two members:
       success - (boolean) indicates success of the rendering process
       data - (string) SVG data only present after successful rendering
       failure - (string) reason for render failure; only present after failed
                 rendering, may be cryptic and is not necessarily human-friendly
*/
function render_svg(jsonData, width, height) {
  const chart = echarts.init(null, null, {
    renderer: 'svg',
    ssr: true,
    width: width,
    height: height
  });

  jsonData.animation = false;
  chart.setOption(jsonData);

  const svg_data = chart.renderToSVGString();
  return {
    success: true,
    data: svg_data
  };
}

/* Renders JSON data for a ECharts plot into a PNG image.

   Parameters:
     jsonData - (string) the JSON data required by ECharts
     width    - (number) width of the PNG image in pixels
     height   - (number) height of the PNG image in pixels

   Returns:
     object that contains two members:
       success - (boolean) indicates success of the rendering process
       data - (buffer) PNG data, only present after successful rendering
       failure - (string) reason for render failure; only present after failed
                 rendering, may be cryptic and is not necessarily human-friendly
*/
function render_png(jsonData, width, height) {
  const canvas = createCanvas(width, height);
  const chart = echarts.init(canvas);

  jsonData.animation = false;
  chart.setOption(jsonData);

  const png_data = canvas.toBuffer('image/png');
  return {
    success: true,
    data: png_data
  };
}

/* Renders JSON data for a ECharts plot into a PNG or SVG image.

   Parameters:
     jsonData - (string) the JSON data required by ECharts
     do_svg   - (boolean) whether to render into an SVG image (true) or a PNG
                          image (false)
     width    - (number) width of the PNG / SVG image in pixels
     height   - (number) height of the PNG / SVG image in pixels

   Returns:
     object that contains two members:
       success - (boolean) indicates success of the rendering process
       data    - (string | buffer) image data, only present after successful
                  rendering
       failure - (string) reason for render failure; only present after failed
                 rendering, may be cryptic and is not necessarily human-friendly
*/
exports.render = function(jsonData, do_svg, width, height) {
  if (typeof jsonData !== 'string') {
    return {
      success: false,
      failure: 'json-not-a-string'
    };
  }
  if (typeof do_svg !== 'boolean') {
    return {
      success: false,
      failure: 'svg-png-switch-not-a-boolean'
    };
  }

  const json_object = JSON.parse(jsonData);

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
  width = width || parseInt(json_object.imageWidth, 10) || 700;
  height = height || parseInt(json_object.imageHeight, 10) || 400;

  if (!do_svg) {
    return render_png(json_object, width, height);
  } else {
    return render_svg(json_object, width, height);
  }
};
