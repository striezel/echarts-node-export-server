/*
    ECharts offline image export server with Node.js test suite
    Copyright (C) 2025  Dirk Stolle

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

const assert = require('node:assert');
const http = require('node:http');
const { describe, it } = require('node:test');

describe('Sunburst charts', () => {
  it('Basic Sunburst Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=sunburst-simple example.
    const payload = `{
                       "series": {
                         "type": "sunburst",
                         "data": [
                           {
                             "name": "Grandpa",
                             "children": [
                               {
                                 "name": "Uncle Leo",
                                 "value": 15,
                                 "children": [
                                   { "name": "Cousin Jack", "value": 2 },
                                   {
                                     "name": "Cousin Mary",
                                     "value": 5,
                                     "children": [
                                       { "name": "Jackson", "value": 2 }
                                     ]
                                   },
                                   { "name": "Cousin Ben", "value": 4 }
                                 ]
                               },
                               {
                                 "name": "Father",
                                 "value": 10,
                                 "children": [
                                   { "name": "Me", "value": 5 },
                                   { "name": "Brother Peter", "value": 1 }
                                 ]
                               }
                             ]
                           },
                           {
                             "name": "Nancy",
                             "children": [
                               {
                                 "name": "Uncle Nike",
                                 "children": [
                                   { "name": "Cousin Betty", "value": 1 },
                                   { "name": "Cousin Jenny", "value": 2 }
                                 ]
                               }
                             ]
                           }
                         ],
                         "radius": [
                           0,
                           "90%"
                         ],
                         "label": {
                           "rotate": "radial"
                         }
                       }
                     }`;
    req.write(payload);
    req.end();

    req.on('response', (response) => {
      assert.strictEqual(200, response.statusCode);
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        assert.ok(body.startsWith('<svg'));
        assert.ok(body.endsWith('</svg>'));

        /* Current server response is something like
        
           <svg width="700" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 700 400">
<rect width="700" height="400" x="0" y="0" fill="none"></rect>
<path d="M350 155A45 45 0 1 1 321.9 164.8L350 200Z" fill="#91cc75" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-0"></path>
<path d="M350 110A90 90 0 1 1 330 287.7L340 243.9A45 45 0 1 0 350 155Z" fill="rgb(158,210,134)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M350 65A135 135 0 0 1 471.6 141.4L431.1 161A90 90 0 0 0 350 110Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M350 20A180 180 0 0 1 428.1 37.8L408.6 78.4A135 135 0 0 0 350 65Z" fill="rgb(186,223,168)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M471.6 141.4A135 135 0 0 1 471.6 258.6L431.1 239A90 90 0 0 0 431.1 161Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M471.6 258.6A135 135 0 0 1 434.2 305.5L406.1 270.4A90 90 0 0 0 431.1 239Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M330 287.7A90 90 0 0 1 293.9 129.6L321.9 164.8A45 45 0 0 0 340 243.9Z" fill="rgb(158,210,134)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="7" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M320 331.6A135 135 0 0 1 218.4 230L262.3 220A90 90 0 0 0 330 287.7Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="8" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M218.4 230A135 135 0 0 1 215 200L260 200A90 90 0 0 0 262.3 220Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="9" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M321.9 164.8A45 45 0 0 1 350 155L350 200Z" fill="#fac858" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="10" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<path d="M293.9 129.6A90 90 0 0 1 350 110L350 155A45 45 0 0 0 321.9 164.8Z" fill="rgb(250,206,108)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="11" ecmeta_ssr_type="chart" class="zr0-cls-5"></path>
<path d="M265.8 94.5A135 135 0 0 1 320 68.4L330 112.3A90 90 0 0 0 293.9 129.6Z" fill="rgb(251,213,129)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="13" ecmeta_ssr_type="chart" class="zr0-cls-6"></path>
<path d="M320 68.4A135 135 0 0 1 350 65L350 110A90 90 0 0 0 330 112.3Z" fill="rgb(251,213,129)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="12" ecmeta_ssr_type="chart" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.33,0.944,-0.944,0.33,357.4313,221.2374)" fill="#333">Grandpa</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.994,0.112,-0.112,0.994,417.0756,207.5576)" fill="#333">Uncle Leo</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.532,-0.847,0.847,0.532,409.8536,104.7435)" fill="#333">Cousin Mary</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.223,-0.975,0.975,0.223,385.047,46.4489)" fill="#333">Jackson</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(462.5 200)" fill="#333">Cousin Ben</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.782,0.623,-0.623,0.782,437.956,270.1426)" fill="#333">Cousin Jack</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.975,-0.223,0.223,0.975,284.1924,215.0202)" fill="#333">Father</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.707,-0.707,0.707,0.707,270.4505,279.5495)" fill="#333">Me</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.994,-0.112,0.112,0.994,238.2074,212.596)" fill="#333">Brother Peter</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.33,0.944,-0.944,0.33,342.5687,178.7626)" fill="#333">Nancy</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.33,0.944,-0.944,0.33,327.7062,136.2879)" fill="#333">Uncle Nike</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.434,0.901,-0.901,0.434,301.1881,98.641)" fill="#333">Cousin Jenny</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.112,0.994,-0.994,0.112,337.404,88.2074)" fill="#333">Cousin Betty</text>
<style ><![CDATA[
.zr0-cls-0:hover {
cursor:pointer;
fill:rgba(159,224,128,1);
}
.zr0-cls-1:hover {
cursor:pointer;
fill:rgba(173,231,147,1);
}
.zr0-cls-2:hover {
cursor:pointer;
fill:rgba(189,237,166,1);
}
.zr0-cls-3:hover {
cursor:pointer;
fill:rgba(204,245,184,1);
}
.zr0-cls-4:hover {
cursor:pointer;
fill:rgba(255,220,96,1);
}
.zr0-cls-5:hover {
cursor:pointer;
fill:rgba(255,226,118,1);
}
.zr0-cls-6:hover {
cursor:pointer;
fill:rgba(255,234,141,1);
}

]]>

</style>
</svg>
        
        */

        // Check partial matches, avoiding the random class / id bits.
        assert.ok(body.indexOf('<svg width="700" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 700 400">') >= 0);
        assert.ok(body.indexOf('<rect width="700" height="400" x="0" y="0" fill="none"></rect>') > 0);
        assert.ok(body.indexOf(`<path d="M350 155A45 45 0 1 1 321.9 164.8L350 200Z" fill="#91cc75" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M350 110A90 90 0 1 1 330 287.7L340 243.9A45 45 0 1 0 350 155Z" fill="rgb(158,210,134)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M350 65A135 135 0 0 1 471.6 141.4L431.1 161A90 90 0 0 0 350 110Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M350 20A180 180 0 0 1 428.1 37.8L408.6 78.4A135 135 0 0 0 350 65Z" fill="rgb(186,223,168)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M471.6 141.4A135 135 0 0 1 471.6 258.6L431.1 239A90 90 0 0 0 431.1 161Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M471.6 258.6A135 135 0 0 1 434.2 305.5L406.1 270.4A90 90 0 0 0 431.1 239Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M330 287.7A90 90 0 0 1 293.9 129.6L321.9 164.8A45 45 0 0 0 340 243.9Z" fill="rgb(158,210,134)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="7" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M320 331.6A135 135 0 0 1 218.4 230L262.3 220A90 90 0 0 0 330 287.7Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="8" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M218.4 230A135 135 0 0 1 215 200L260 200A90 90 0 0 0 262.3 220Z" fill="rgb(172,216,151)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="9" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M321.9 164.8A45 45 0 0 1 350 155L350 200Z" fill="#fac858" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="10" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M293.9 129.6A90 90 0 0 1 350 110L350 155A45 45 0 0 0 321.9 164.8Z" fill="rgb(250,206,108)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="11" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M265.8 94.5A135 135 0 0 1 320 68.4L330 112.3A90 90 0 0 0 293.9 129.6Z" fill="rgb(251,213,129)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="13" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M320 68.4A135 135 0 0 1 350 65L350 110A90 90 0 0 0 330 112.3Z" fill="rgb(251,213,129)" stroke="white" stroke-linejoin="bevel" ecmeta_series_index="0" ecmeta_data_index="12" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.33,0.944,-0.944,0.33,357.4313,221.2374)" fill="#333">Grandpa</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.994,0.112,-0.112,0.994,417.0756,207.5576)" fill="#333">Uncle Leo</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.532,-0.847,0.847,0.532,409.8536,104.7435)" fill="#333">Cousin Mary</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.223,-0.975,0.975,0.223,385.047,46.4489)" fill="#333">Jackson</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(462.5 200)" fill="#333">Cousin Ben</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.782,0.623,-0.623,0.782,437.956,270.1426)" fill="#333">Cousin Jack</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.975,-0.223,0.223,0.975,284.1924,215.0202)" fill="#333">Father</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.707,-0.707,0.707,0.707,270.4505,279.5495)" fill="#333">Me</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.994,-0.112,0.112,0.994,238.2074,212.596)" fill="#333">Brother Peter</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" transform="matrix(0.33,0.944,-0.944,0.33,342.5687,178.7626)" fill="#333">Nancy</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.33,0.944,-0.944,0.33,327.7062,136.2879)" fill="#333">Uncle Nike</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.434,0.901,-0.901,0.434,301.1881,98.641)" fill="#333">Cousin Jenny</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="matrix(0.112,0.994,-0.994,0.112,337.404,88.2074)" fill="#333">Cousin Betty</text>
<style ><![CDATA[
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(159,224,128,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(173,231,147,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(189,237,166,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(204,245,184,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(255,220,96,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(255,226,118,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(255,234,141,1);
}

]]>

</style>
</svg>`) > 0);
      });
    });
  });

/*
  it('request with different data', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    const payload = '...';
    req.write(payload);
    req.end();

    req.on('response', (response) => {
      assert.strictEqual(200, response.statusCode);
      let body = '';
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        assert.ok(body.startsWith('<svg'));
        assert.ok(body.endsWith('</svg>'));
        assert.ok(body.indexOf('') >= 0);
        assert.ok(body.indexOf('') > 0);
        assert.ok(body.indexOf('') > 0);
      });
    });
  });
  */
});
