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
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr2-cls-8"></path>
<path d="M70 285.5L630 285.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr2-cls-8"></path>
<path d="M70 240.5L630 240.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr2-cls-8"></path>
<path d="M70 195.5L630 195.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr2-cls-8"></path>
<path d="M70 150.5L630 150.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr2-cls-8"></path>
<path d="M70 105.5L630 105.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr2-cls-8"></path>
<path d="M70 60.5L630 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr2-cls-8"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr2-cls-8"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr2-cls-8"></path>
<path d="M150.5 330L150.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr2-cls-8"></path>
<path d="M230.5 330L230.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr2-cls-8"></path>
<path d="M310.5 330L310.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr2-cls-8"></path>
<path d="M390.5 330L390.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr2-cls-8"></path>
<path d="M470.5 330L470.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr2-cls-8"></path>
<path d="M550.5 330L550.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr2-cls-8"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr2-cls-8"></path>
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
<g clip-path="url(#zr2-c0)">
<path d="M110 195L190 123L270 128.4L350 133.8L430 208.5L510 197.7L590 96" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="zr2-cls-10"></path>
</g>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,110,195)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr2-cls-11"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,190,123)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr2-cls-11"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,270,128.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr2-cls-11"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,350,133.8)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr2-cls-11"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,430,208.5)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr2-cls-11"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,510,197.7)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr2-cls-11"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,590,96)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr2-cls-11"></path>
<defs >
<clipPath id="zr2-c0">
<path d="M69 59l562 0l0 272l-562 0Z" fill="#000" class="zr2-cls-9"></path>
</clipPath>
</defs>
<style ><![CDATA[
.zr2-cls-8:hover {
pointer-events:none;
}
.zr2-cls-9:hover {
cursor:pointer;
fill:rgba(0,0,0,1);
}
.zr2-cls-10:hover {
cursor:pointer;
}
.zr2-cls-11:hover {
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
        assert.ok(body.indexOf(`<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 285.5L630 285.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 240.5L630 240.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 195.5L630 195.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 150.5L630 150.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 105.5L630 105.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 60.5L630 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M150.5 330L150.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M230.5 330L230.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M310.5 330L310.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M390.5 330L390.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M470.5 330L470.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M550.5 330L550.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
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
<path d="M110 195L190 123L270 128.4L350 133.8L430 208.5L510 197.7L590 96" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="`) > 0);
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

  it('Smoothed Line Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=line-smooth example.
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
                           "data": [820, 932, 901, 934, 1290, 1330, 1320],
                           "type": "line",
                           "smooth": true
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
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 276.5L630 276.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 222.5L630 222.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 168.5L630 168.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 114.5L630 114.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 60.5L630 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-0"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M150.5 330L150.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M230.5 330L230.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M310.5 330L310.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M390.5 330L390.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M470.5 330L470.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M550.5 330L550.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 276)" fill="#6E7079">300</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 222)" fill="#6E7079">600</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 168)" fill="#6E7079">900</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 114)" fill="#6E7079">1,200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">1,500</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(110 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(190 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(270 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(430 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(510 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(590 338)" fill="#6E7079">Sun</text>
<g clip-path="url(#zr0-c0)">
<path d="M110 182.4C110 182.4 149.4 162.2 190 162.2C229.4 162.2 230 167.8 270 167.8C310 167.8 314.9 167.8 350 161.9C394.9 154.3 385.1 107 430 97.8C465.1 90.6 469.9 90.6 510 90.6C549.9 90.6 590 92.4 590 92.4" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="zr0-cls-2"></path>
</g>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,110,182.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,190,162.24)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,270,167.82)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,350,161.88)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,430,97.8)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,510,90.6)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,590,92.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<defs >
<clipPath id="zr0-c0">
<path d="M69 59l562 0l0 272l-562 0Z" fill="#000" class="zr0-cls-1"></path>
</clipPath>
</defs>
<style ><![CDATA[
.zr0-cls-0:hover {
pointer-events:none;
}
.zr0-cls-1:hover {
cursor:pointer;
fill:rgba(0,0,0,1);
}
.zr0-cls-2:hover {
cursor:pointer;
}
.zr0-cls-3:hover {
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
        assert.ok(body.indexOf(`<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 276.5L630 276.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 222.5L630 222.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 168.5L630 168.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 114.5L630 114.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 60.5L630 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M150.5 330L150.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M230.5 330L230.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M310.5 330L310.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M390.5 330L390.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M470.5 330L470.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M550.5 330L550.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 276)" fill="#6E7079">300</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 222)" fill="#6E7079">600</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 168)" fill="#6E7079">900</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 114)" fill="#6E7079">1,200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">1,500</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(110 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(190 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(270 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(430 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(510 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(590 338)" fill="#6E7079">Sun</text>
<g clip-path="url(#`) > 0);
        assert.ok(body.indexOf(`)">
<path d="M110 182.4C110 182.4 149.4 162.2 190 162.2C229.4 162.2 230 167.8 270 167.8C310 167.8 314.9 167.8 350 161.9C394.9 154.3 385.1 107 430 97.8C465.1 90.6 469.9 90.6 510 90.6C549.9 90.6 590 92.4 590 92.4" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</g>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,110,182.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,190,162.24)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,270,167.82)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,350,161.88)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,430,97.8)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,510,90.6)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,590,92.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
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

  it('Basic area chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=area-basic example.
    const payload = `{
                       "xAxis": {
                         "type": "category",
                         "boundaryGap": false,
                         "data": [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]
                       },
                       "yAxis": {
                         "type": "value"
                       },
                       "series": [
                         {
                           "data": [ 820, 932, 901, 934, 1290, 1330, 1320 ],
                           "type": "line",
                           "areaStyle": {}
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
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 276.5L630 276.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 222.5L630 222.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 168.5L630 168.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 114.5L630 114.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 60.5L630 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-0"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M163.5 330L163.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M256.5 330L256.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M350.5 330L350.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M443.5 330L443.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M536.5 330L536.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 276)" fill="#6E7079">300</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 222)" fill="#6E7079">600</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 168)" fill="#6E7079">900</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 114)" fill="#6E7079">1,200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">1,500</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(70 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(163.3333 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(256.6667 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(443.3333 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(536.6667 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(630 338)" fill="#6E7079">Sun</text>
<g clip-path="url(#zr0-c0)">
<path d="M70 182.4L163.3 162.2L256.7 167.8L350 161.9L443.3 97.8L536.7 90.6L630 92.4L630 330L536.7 330L443.3 330L350 330L256.7 330L163.3 330L70 330Z" fill="#5470c6" fill-opacity="0.7" class="zr0-cls-2"></path>
<path d="M70 182.4L163.3 162.2L256.7 167.8L350 161.9L443.3 97.8L536.7 90.6L630 92.4" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="zr0-cls-3"></path>
</g>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,70,182.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,163.3333,162.24)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,256.6667,167.82)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,350,161.88)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,443.3333,97.8)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,536.6667,90.6)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,630,92.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<defs >
<clipPath id="zr0-c0">
<path d="M69 59l562 0l0 272l-562 0Z" fill="#000" class="zr0-cls-1"></path>
</clipPath>
</defs>
<style ><![CDATA[
.zr0-cls-0:hover {
pointer-events:none;
}
.zr0-cls-1:hover {
cursor:pointer;
fill:rgba(0,0,0,1);
}
.zr0-cls-2:hover {
cursor:pointer;
fill:rgba(92,123,217,1);
}
.zr0-cls-3:hover {
cursor:pointer;
}
.zr0-cls-4:hover {
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
        assert.ok(body.indexOf(`<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 276.5L630 276.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 222.5L630 222.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 168.5L630 168.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 114.5L630 114.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 60.5L630 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M163.5 330L163.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M256.5 330L256.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M350.5 330L350.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M443.5 330L443.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M536.5 330L536.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 276)" fill="#6E7079">300</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 222)" fill="#6E7079">600</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 168)" fill="#6E7079">900</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 114)" fill="#6E7079">1,200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">1,500</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(70 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(163.3333 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(256.6667 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(443.3333 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(536.6667 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(630 338)" fill="#6E7079">Sun</text>
<g clip-path="url(#`) > 0);
        assert.ok(body.indexOf(`)">
<path d="M70 182.4L163.3 162.2L256.7 167.8L350 161.9L443.3 97.8L536.7 90.6L630 92.4L630 330L536.7 330L443.3 330L350 330L256.7 330L163.3 330L70 330Z" fill="#5470c6" fill-opacity="0.7" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 182.4L163.3 162.2L256.7 167.8L350 161.9L443.3 97.8L536.7 90.6L630 92.4" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</g>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,70,182.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,163.3333,162.24)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,256.6667,167.82)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,350,161.88)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,443.3333,97.8)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,536.6667,90.6)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,630,92.4)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
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
fill:rgba(92,123,217,1);
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

  it('Stacked Line Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=line-stack example.
    const payload = `{
                       "title": {
                         "text": "Stacked Line"
                       },
                       "tooltip": {
                         "trigger": "axis"
                       },
                       "legend": {
                         "data": [ "Email", "Union Ads", "Video Ads", "Direct", "Search Engine" ]
                       },
                       "grid": {
                         "left": "3%",
                         "right": "4%",
                         "bottom": "3%",
                         "containLabel": true
                       },
                       "xAxis": {
                         "type": "category",
                         "boundaryGap": false,
                         "data": [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ]
                       },
                       "yAxis": {
                         "type": "value"
                       },
                       "series": [
                         {
                           "name": "Email",
                           "type": "line",
                           "stack": "Total",
                           "data": [ 120, 132, 101, 134, 90, 230, 210 ]
                         },
                         {
                           "name": "Union Ads",
                           "type": "line",
                           "stack": "Total",
                           "data": [ 220, 182, 191, 234, 290, 330, 310 ]
                         },
                         {
                           "name": "Video Ads",
                           "type": "line",
                           "stack": "Total",
                           "data": [ 150, 232, 201, 154, 190, 330, 410 ]
                         },
                         {
                           "name": "Direct",
                           "type": "line",
                           "stack": "Total",
                           "data": [ 320, 332, 301, 334, 390, 330, 320 ]
                         },
                         {
                           "name": "Search Engine",
                           "type": "line",
                           "stack": "Total",
                           "data": [ 820, 932, 901, 934, 1290, 1330, 1320 ]
                         }
                       ]
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
<path d="M59.2 368.5L672 368.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M59.2 316.5L672 316.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M59.2 265.5L672 265.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M59.2 214.5L672 214.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M59.2 162.5L672 162.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M59.2 111.5L672 111.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M59.2 60.5L672 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M59.2 368.5L672 368.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-0"></path>
<path d="M59.5 368L59.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M161.5 368L161.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M263.5 368L263.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M365.5 368L365.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M467.5 368L467.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M570.5 368L570.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M672.5 368L672.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 368)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 316.6667)" fill="#6E7079">500</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 265.3333)" fill="#6E7079">1,000</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 214)" fill="#6E7079">1,500</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 162.6667)" fill="#6E7079">2,000</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 111.3333)" fill="#6E7079">2,500</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 60)" fill="#6E7079">3,000</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(59.24 376)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(161.3667 376)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(263.4933 376)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(365.62 376)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(467.7467 376)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(569.8733 376)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(672 376)" fill="#6E7079">Sun</text>
<g clip-path="url(#zr0-c0)">
<path d="M59.2 355.7L161.4 354.4L263.5 357.6L365.6 354.2L467.7 358.8L569.9 344.4L672 346.4" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="zr0-cls-2"></path>
</g>
<g clip-path="url(#zr0-c1)">
<path d="M59.2 333.1L161.4 335.8L263.5 338L365.6 330.2L467.7 329L569.9 310.5L672 314.6" fill="none" pointer-events="visible" stroke="#91cc75" stroke-width="2" stroke-linejoin="bevel" class="zr0-cls-2"></path>
</g>
<g clip-path="url(#zr0-c2)">
<path d="M59.2 317.7L161.4 311.9L263.5 317.4L365.6 314.4L467.7 309.5L569.9 276.6L672 272.5" fill="none" pointer-events="visible" stroke="#fac858" stroke-width="2" stroke-linejoin="bevel" class="zr0-cls-2"></path>
</g>
<g clip-path="url(#zr0-c3)">
<path d="M59.2 284.8L161.4 277.9L263.5 286.5L365.6 280.1L467.7 269.4L569.9 242.7L672 239.7" fill="none" pointer-events="visible" stroke="#ee6666" stroke-width="2" stroke-linejoin="bevel" class="zr0-cls-2"></path>
</g>
<g clip-path="url(#zr0-c4)">
<path d="M59.2 200.7L161.4 182.2L263.5 194L365.6 184.2L467.7 137L569.9 106.2L672 104.1" fill="none" pointer-events="visible" stroke="#73c0de" stroke-width="2" stroke-linejoin="bevel" class="zr0-cls-2"></path>
</g>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,355.68)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,354.448)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,357.6307)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,354.2427)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,358.76)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,344.3867)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,346.44)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,333.0933)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,335.7627)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,338.0213)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,330.2187)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,328.9867)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,310.5067)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,314.6133)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,317.6933)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,311.944)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,317.3853)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,314.408)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,309.48)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,276.6267)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,272.52)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,284.84)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,277.8587)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,286.4827)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,280.1173)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,269.44)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,242.7467)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,239.6667)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,200.6533)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,182.1733)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,193.98)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,184.2267)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,137)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,106.2)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,104.1467)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M-5 -5l455.9 0l0 23.2l-455.9 0Z" transform="translate(127.04 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="zr0-cls-0"></path>
<path d="M0 7L25 7" transform="translate(128.04 4.6)" fill="#000" stroke="#5470c6" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(128.04 4.6)" fill="#fff" stroke="#5470c6" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(128.04 4.6)" fill="#333">Email</text>
<path d="M-1 0.4l61 0l0 13.2l-61 0Z" transform="translate(128.04 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" class="zr0-cls-4"></path>
<path d="M0 7L25 7" transform="translate(199.04 4.6)" fill="#000" stroke="#91cc75" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(199.04 4.6)" fill="#fff" stroke="#91cc75" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(199.04 4.6)" fill="#333">Union Ads</text>
<path d="M-1 0.4l86.6 0l0 13.2l-86.6 0Z" transform="translate(199.04 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="1" ecmeta_data_index="1" ecmeta_ssr_type="legend" class="zr0-cls-4"></path>
<path d="M0 7L25 7" transform="translate(295.6 4.6)" fill="#000" stroke="#fac858" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(295.6 4.6)" fill="#fff" stroke="#fac858" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(295.6 4.6)" fill="#333">Video Ads</text>
<path d="M-1 0.4l86 0l0 13.2l-86 0Z" transform="translate(295.6 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="2" ecmeta_data_index="2" ecmeta_ssr_type="legend" class="zr0-cls-4"></path>
<path d="M0 7L25 7" transform="translate(391.56 4.6)" fill="#000" stroke="#ee6666" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(391.56 4.6)" fill="#fff" stroke="#ee6666" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(391.56 4.6)" fill="#333">Direct</text>
<path d="M-1 0.4l62.3 0l0 13.2l-62.3 0Z" transform="translate(391.56 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="3" ecmeta_data_index="3" ecmeta_ssr_type="legend" class="zr0-cls-4"></path>
<path d="M0 7L25 7" transform="translate(463.88 4.6)" fill="#000" stroke="#73c0de" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(463.88 4.6)" fill="#fff" stroke="#73c0de" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(463.88 4.6)" fill="#333">Search Engine</text>
<path d="M-1 0.4l110.1 0l0 13.2l-110.1 0Z" transform="translate(463.88 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="4" ecmeta_data_index="4" ecmeta_ssr_type="legend" class="zr0-cls-4"></path>
<path d="M-5 -5l114.6 0l0 28l-114.6 0Z" transform="translate(5 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:18px;font-family:sans-serif;font-weight:bold;" xml:space="preserve" y="9" transform="translate(5 5)" fill="#464646">Stacked Line</text>
<defs >
<clipPath id="zr0-c0">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="zr0-cls-1"></path>
</clipPath>
<clipPath id="zr0-c1">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="zr0-cls-1"></path>
</clipPath>
<clipPath id="zr0-c2">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="zr0-cls-1"></path>
</clipPath>
<clipPath id="zr0-c3">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="zr0-cls-1"></path>
</clipPath>
<clipPath id="zr0-c4">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="zr0-cls-1"></path>
</clipPath>
</defs>
<style ><![CDATA[
.zr0-cls-0:hover {
pointer-events:none;
}
.zr0-cls-1:hover {
cursor:pointer;
fill:rgba(0,0,0,1);
}
.zr0-cls-2:hover {
cursor:pointer;
}
.zr0-cls-3:hover {
cursor:pointer;
fill:rgba(255,255,255,1);
}
.zr0-cls-4:hover {
cursor:pointer;
fill:rgba(0,0,0,0);
}

]]>

</style>
</svg>

        */

        // Check partial matches, avoiding the random class / id bits.
        assert.ok(body.indexOf('<svg width="700" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 700 400">') >= 0);
        assert.ok(body.indexOf(`<rect width="700" height="400" x="0" y="0" fill="none"></rect>
<path d="M59.2 368.5L672 368.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M59.2 316.5L672 316.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M59.2 265.5L672 265.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M59.2 214.5L672 214.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M59.2 162.5L672 162.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M59.2 111.5L672 111.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M59.2 60.5L672 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M59.2 368.5L672 368.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M59.5 368L59.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M161.5 368L161.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M263.5 368L263.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M365.5 368L365.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M467.5 368L467.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M570.5 368L570.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M672.5 368L672.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 368)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 316.6667)" fill="#6E7079">500</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 265.3333)" fill="#6E7079">1,000</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 214)" fill="#6E7079">1,500</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 162.6667)" fill="#6E7079">2,000</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 111.3333)" fill="#6E7079">2,500</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(51.24 60)" fill="#6E7079">3,000</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(59.24 376)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(161.3667 376)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(263.4933 376)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(365.62 376)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(467.7467 376)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(569.8733 376)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(672 376)" fill="#6E7079">Sun</text>
<g clip-path="url(#`) > 0);
        assert.ok(body.indexOf(`)">
<path d="M59.2 355.7L161.4 354.4L263.5 357.6L365.6 354.2L467.7 358.8L569.9 344.4L672 346.4" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="bevel" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</g>
<g clip-path="url(#`) > 0);
        assert.ok(body.indexOf(`)">
<path d="M59.2 333.1L161.4 335.8L263.5 338L365.6 330.2L467.7 329L569.9 310.5L672 314.6" fill="none" pointer-events="visible" stroke="#91cc75" stroke-width="2" stroke-linejoin="bevel" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</g>
<g clip-path="url(#`) > 0);
        assert.ok(body.indexOf(`)">
<path d="M59.2 317.7L161.4 311.9L263.5 317.4L365.6 314.4L467.7 309.5L569.9 276.6L672 272.5" fill="none" pointer-events="visible" stroke="#fac858" stroke-width="2" stroke-linejoin="bevel" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</g>
<g clip-path="url(#`) > 0);
        assert.ok(body.indexOf(`)">
<path d="M59.2 284.8L161.4 277.9L263.5 286.5L365.6 280.1L467.7 269.4L569.9 242.7L672 239.7" fill="none" pointer-events="visible" stroke="#ee6666" stroke-width="2" stroke-linejoin="bevel" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</g>
<g clip-path="url(#`) > 0);
        assert.ok(body.indexOf(`)">
<path d="M59.2 200.7L161.4 182.2L263.5 194L365.6 184.2L467.7 137L569.9 106.2L672 104.1" fill="none" pointer-events="visible" stroke="#73c0de" stroke-width="2" stroke-linejoin="bevel" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</g>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,355.68)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,354.448)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,357.6307)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,354.2427)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,358.76)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,344.3867)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,346.44)" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,333.0933)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,335.7627)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,338.0213)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,330.2187)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,328.9867)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,310.5067)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,314.6133)" fill="#fff" stroke="#91cc75" ecmeta_series_index="1" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,317.6933)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,311.944)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,317.3853)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,314.408)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,309.48)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,276.6267)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,272.52)" fill="#fff" stroke="#fac858" ecmeta_series_index="2" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,284.84)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,277.8587)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,286.4827)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,280.1173)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,269.44)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,242.7467)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,239.6667)" fill="#fff" stroke="#ee6666" ecmeta_series_index="3" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,59.24,200.6533)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,161.3667,182.1733)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,263.4933,193.98)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,365.62,184.2267)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,467.7467,137)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,569.8734,106.2)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(2,0,0,2,672,104.1467)" fill="#fff" stroke="#73c0de" ecmeta_series_index="4" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M-5 -5l455.9 0l0 23.2l-455.9 0Z" transform="translate(127.04 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M0 7L25 7" transform="translate(128.04 4.6)" fill="#000" stroke="#5470c6" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(128.04 4.6)" fill="#fff" stroke="#5470c6" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(128.04 4.6)" fill="#333">Email</text>
<path d="M-1 0.4l61 0l0 13.2l-61 0Z" transform="translate(128.04 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M0 7L25 7" transform="translate(199.04 4.6)" fill="#000" stroke="#91cc75" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(199.04 4.6)" fill="#fff" stroke="#91cc75" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(199.04 4.6)" fill="#333">Union Ads</text>
<path d="M-1 0.4l86.6 0l0 13.2l-86.6 0Z" transform="translate(199.04 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="1" ecmeta_data_index="1" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M0 7L25 7" transform="translate(295.6 4.6)" fill="#000" stroke="#fac858" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(295.6 4.6)" fill="#fff" stroke="#fac858" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(295.6 4.6)" fill="#333">Video Ads</text>
<path d="M-1 0.4l86 0l0 13.2l-86 0Z" transform="translate(295.6 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="2" ecmeta_data_index="2" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M0 7L25 7" transform="translate(391.56 4.6)" fill="#000" stroke="#ee6666" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(391.56 4.6)" fill="#fff" stroke="#ee6666" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(391.56 4.6)" fill="#333">Direct</text>
<path d="M-1 0.4l62.3 0l0 13.2l-62.3 0Z" transform="translate(391.56 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="3" ecmeta_data_index="3" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M0 7L25 7" transform="translate(463.88 4.6)" fill="#000" stroke="#73c0de" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M18.1 7A5.6 5.6 0 1 1 18.1 6.4A5.6 5.6 0 0 1 18.1 7" transform="translate(463.88 4.6)" fill="#fff" stroke="#73c0de" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(463.88 4.6)" fill="#333">Search Engine</text>
<path d="M-1 0.4l110.1 0l0 13.2l-110.1 0Z" transform="translate(463.88 4.6)" fill="none" pointer-events="visible" ecmeta_series_index="4" ecmeta_data_index="4" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M-5 -5l114.6 0l0 28l-114.6 0Z" transform="translate(5 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:18px;font-family:sans-serif;font-weight:bold;" xml:space="preserve" y="9" transform="translate(5 5)" fill="#464646">Stacked Line</text>
<defs >
<clipPath id="`) > 0);
        assert.ok(body.indexOf(`">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</clipPath>
<clipPath id="`) > 0);
        assert.ok(body.indexOf(`">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</clipPath>
<clipPath id="`) > 0);
        assert.ok(body.indexOf(`">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</clipPath>
<clipPath id="`) > 0);
        assert.ok(body.indexOf(`">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</clipPath>
<clipPath id="`) > 0);
        assert.ok(body.indexOf(`">
<path d="M58 59l616 0l0 310l-616 0Z" fill="#000" class="`) > 0);
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
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(0,0,0,0);
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
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=... example.
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

        // Current server response is something like

        //<svg ...

        //

        // Check partial matches, avoiding the random class / id bits.
        assert.ok(body.indexOf('') >= 0);
        assert.ok(body.indexOf('') > 0);
        assert.ok(body.indexOf('') > 0);
      });
    });
  });
  */
});
