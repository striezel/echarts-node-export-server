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

describe('Scatter charts', () => {
  it('Basic Scatter Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=scatter-simple example.
    const payload = `{
                       "xAxis": {},
                       "yAxis": {},
                       "series": [
                         {
                           "symbolSize": 20,
                           "data": [
                             [10.0, 8.04],
                             [8.07, 6.95],
                             [13.0, 7.58],
                             [9.05, 8.81],
                             [11.0, 8.33],
                             [14.0, 7.66],
                             [13.4, 6.81],
                             [10.0, 6.33],
                             [14.0, 8.96],
                             [12.5, 6.82],
                             [9.15, 7.2],
                             [11.5, 7.2],
                             [3.03, 4.23],
                             [12.2, 7.83],
                             [2.02, 4.47],
                             [1.05, 3.33],
                             [4.05, 4.96],
                             [6.03, 7.24],
                             [12.0, 6.26],
                             [12.0, 8.84],
                             [7.08, 5.82],
                             [5.02, 5.68]
                           ],
                           "type": "scatter"
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
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M70 276.5L630 276.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M70 222.5L630 222.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M70 168.5L630 168.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M70 114.5L630 114.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M70 60.5L630 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M70.5 60L70.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M182.5 60L182.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M294.5 60L294.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M406.5 60L406.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M518.5 60L518.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M630.5 60L630.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr1-cls-2"></path>
<path d="M70.5 330L70.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr1-cls-2"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr1-cls-2"></path>
<path d="M70 330.5L65 330.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M70 276.5L65 276.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M70 222.5L65 222.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M70 168.5L65 168.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M70 114.5L65 114.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M70 60.5L65 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M182.5 330L182.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M294.5 330L294.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M406.5 330L406.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M518.5 330L518.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr1-cls-2"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 276)" fill="#6E7079">2</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 222)" fill="#6E7079">4</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 168)" fill="#6E7079">6</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 114)" fill="#6E7079">8</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">10</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(70 338)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(182 338)" fill="#6E7079">3</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(294 338)" fill="#6E7079">6</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(406 338)" fill="#6E7079">9</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(518 338)" fill="#6E7079">12</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(630 338)" fill="#6E7079">15</text>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,443.3333,112.92)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,371.28,142.35)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,555.3333,125.34)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,407.8667,92.13)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,480.6667,105.09)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,592.6667,123.18)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,570.2667,146.13)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,443.3333,159.09)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="7" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,592.6667,88.08)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="8" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,536.6667,145.86)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="9" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,411.6,135.6)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="10" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,499.3333,135.6)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="11" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,183.12,215.79)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="12" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,525.4667,118.59)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="13" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,145.4133,209.31)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="14" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,109.2,240.09)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="15" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,221.2,196.08)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="16" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,295.12,134.52)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="17" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,518,160.98)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="18" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,518,91.32)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="19" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,334.32,172.86)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="20" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,257.4133,176.64)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="21" ecmeta_ssr_type="chart" class="zr1-cls-3"></path>
<style ><![CDATA[
.zr1-cls-2:hover {
pointer-events:none;
}
.zr1-cls-3:hover {
cursor:pointer;
fill:rgba(92,123,217,1);
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
<path d="M70.5 60L70.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M182.5 60L182.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M294.5 60L294.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M406.5 60L406.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M518.5 60L518.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M630.5 60L630.5 330" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70.5 330L70.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 330.5L65 330.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 276.5L65 276.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 222.5L65 222.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 168.5L65 168.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 114.5L65 114.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 60.5L65 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M182.5 330L182.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M294.5 330L294.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M406.5 330L406.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M518.5 330L518.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 276)" fill="#6E7079">2</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 222)" fill="#6E7079">4</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 168)" fill="#6E7079">6</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 114)" fill="#6E7079">8</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">10</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(70 338)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(182 338)" fill="#6E7079">3</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(294 338)" fill="#6E7079">6</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(406 338)" fill="#6E7079">9</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(518 338)" fill="#6E7079">12</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(630 338)" fill="#6E7079">15</text>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,443.3333,112.92)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,371.28,142.35)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,555.3333,125.34)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,407.8667,92.13)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,480.6667,105.09)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,592.6667,123.18)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,570.2667,146.13)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,443.3333,159.09)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="7" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,592.6667,88.08)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="8" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,536.6667,145.86)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="9" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,411.6,135.6)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="10" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,499.3333,135.6)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="11" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,183.12,215.79)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="12" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,525.4667,118.59)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="13" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,145.4133,209.31)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="14" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,109.2,240.09)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="15" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,221.2,196.08)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="16" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,295.12,134.52)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="17" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,518,160.98)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="18" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,518,91.32)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="19" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,334.32,172.86)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="20" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(10,0,0,10,257.4133,176.64)" fill="#5470c6" fill-opacity="0.8" ecmeta_series_index="0" ecmeta_data_index="21" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<style ><![CDATA[
.`) > 0);
        assert.ok(body.indexOf(`:hover {
pointer-events:none;
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(92,123,217,1);
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
