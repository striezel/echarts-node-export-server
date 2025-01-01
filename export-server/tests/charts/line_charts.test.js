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

describe('Line charts', () => {
  it('Basic Line Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=line-simple example.
    const payload = `{
                       "xAxis": {
                         "type": "category",
                         "data": [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]
                       },
                       "yAxis": {
                         "type": "value"
                       },
                       "series": [
                         {
                           "data": [ 150, 230, 224, 218, 135, 147, 260 ],
                           "type": "line"
                         }
                       ],
                       "backgroundColor": "#ffffff"
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
<rect width="700" height="400" x="0" y="0" fill="#ffffff"></rect>
<path d="M70 330.5L630 330.5" fill="transparent" stroke="#E0E6F1" class="zr5-cls-20"></path>
<path d="M70 285.5L630 285.5" fill="transparent" stroke="#E0E6F1" class="zr5-cls-20"></path>
<path d="M70 240.5L630 240.5" fill="transparent" stroke="#E0E6F1" class="zr5-cls-20"></path>
<path d="M70 195.5L630 195.5" fill="transparent" stroke="#E0E6F1" class="zr5-cls-20"></path>
<path d="M70 150.5L630 150.5" fill="transparent" stroke="#E0E6F1" class="zr5-cls-20"></path>
<path d="M70 105.5L630 105.5" fill="transparent" stroke="#E0E6F1" class="zr5-cls-20"></path>
<path d="M70 60.5L630 60.5" fill="transparent" stroke="#E0E6F1" class="zr5-cls-20"></path>
<path d="M70 330.5L630 330.5" fill="transparent" stroke="#6E7079" stroke-linecap="round" class="zr5-cls-20"></path>
<path d="M70.5 330L70.5 335" fill="transparent" stroke="#6E7079" class="zr5-cls-20"></path>
<path d="M150.5 330L150.5 335" fill="transparent" stroke="#6E7079" class="zr5-cls-20"></path>
<path d="M230.5 330L230.5 335" fill="transparent" stroke="#6E7079" class="zr5-cls-20"></path>
<path d="M310.5 330L310.5 335" fill="transparent" stroke="#6E7079" class="zr5-cls-20"></path>
<path d="M390.5 330L390.5 335" fill="transparent" stroke="#6E7079" class="zr5-cls-20"></path>
<path d="M470.5 330L470.5 335" fill="transparent" stroke="#6E7079" class="zr5-cls-20"></path>
<path d="M550.5 330L550.5 335" fill="transparent" stroke="#6E7079" class="zr5-cls-20"></path>
<path d="M630.5 330L630.5 335" fill="transparent" stroke="#6E7079" class="zr5-cls-20"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 285)" fill="#6E7079">50</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 240)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 195)" fill="#6E7079">150</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 150)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 105)" fill="#6E7079">250</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">300</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(110 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(190 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(270 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(430 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(510 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(590 338)" fill="#6E7079">Sun</text>
<g clip-path="url(#zr5-c0)">
<path d="M110 195L190 123L270 128.4L350 133.8L430 208.5L510 197.7L590 96" fill="transparent" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="zr5-cls-22"></path>
</g>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,110,195)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr5-cls-23"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,190,123)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr5-cls-23"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,270,128.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr5-cls-23"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,350,133.8)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr5-cls-23"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,430,208.5)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr5-cls-23"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,510,197.7)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr5-cls-23"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,590,96)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr5-cls-23"></path>
<defs >
<clipPath id="zr5-c0">
<path d="M69 59l562 0l0 272l-562 0Z" fill="#000" class="zr5-cls-21"></path>
</clipPath>
</defs>
<style ><![CDATA[
.zr5-cls-20:hover {
pointer-events:none;
}
.zr5-cls-21:hover {
cursor:pointer;
fill:rgba(0,0,0,1);
}
.zr5-cls-22:hover {
cursor:pointer;
}
.zr5-cls-23:hover {
cursor:pointer;
fill:rgba(255,255,255,1);
}

]]>

</style>
</svg>
        
        */

        // Check partial matches, avoiding the random class / id bits.
        assert.ok(body.indexOf('<svg width="700" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 700 400">') >= 0);
        assert.ok(body.indexOf('<rect width="700" height="400" x="0" y="0" fill="#ffffff"></rect>') > 0);
        assert.ok(body.indexOf(`<path d="M70 330.5L630 330.5" fill="transparent" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 285.5L630 285.5" fill="transparent" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 240.5L630 240.5" fill="transparent" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 195.5L630 195.5" fill="transparent" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 150.5L630 150.5" fill="transparent" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 105.5L630 105.5" fill="transparent" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 60.5L630 60.5" fill="transparent" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 330.5L630 330.5" fill="transparent" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70.5 330L70.5 335" fill="transparent" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M150.5 330L150.5 335" fill="transparent" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M230.5 330L230.5 335" fill="transparent" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M310.5 330L310.5 335" fill="transparent" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M390.5 330L390.5 335" fill="transparent" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M470.5 330L470.5 335" fill="transparent" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M550.5 330L550.5 335" fill="transparent" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M630.5 330L630.5 335" fill="transparent" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 285)" fill="#6E7079">50</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 240)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 195)" fill="#6E7079">150</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 150)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 105)" fill="#6E7079">250</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">300</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(110 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(190 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(270 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(430 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(510 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(590 338)" fill="#6E7079">Sun</text>
<g clip-path="url(#`) > 0);
        assert.ok(body.indexOf(`)">
<path d="M110 195L190 123L270 128.4L350 133.8L430 208.5L510 197.7L590 96" fill="transparent" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</g>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,110,195)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,190,123)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,270,128.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,350,133.8)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,430,208.5)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,510,197.7)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,590,96)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<defs >
<clipPath id="`) > 0);
        assert.ok(body.indexOf(`">
<path d="M69 59l562 0l0 272l-562 0Z" fill="#000" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</clipPath>
</defs>
<style ><![CDATA[
.`) > 0);
        assert.ok(body.indexOf(`:hover {
pointer-events:none;
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(0,0,0,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(255,255,255,1);
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
