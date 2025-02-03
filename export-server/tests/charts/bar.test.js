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

describe('Bar charts', () => {
  it('Basic Bar Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=bar-simple example.
    const payload = `{
                       "xAxis": {
                         "type": "category",
                         "data": ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
                       },
                       "yAxis": {
                         "type": "value"
                       },
                       "series": [
                         {
                           "data": [120, 200, 150, 80, 70, 110, 130],
                           "type": "bar"
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
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr4-cls-8"></path>
<path d="M70 262.5L630 262.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr4-cls-8"></path>
<path d="M70 195.5L630 195.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr4-cls-8"></path>
<path d="M70 127.5L630 127.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr4-cls-8"></path>
<path d="M70 60.5L630 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr4-cls-8"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr4-cls-8"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr4-cls-8"></path>
<path d="M150.5 330L150.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr4-cls-8"></path>
<path d="M230.5 330L230.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr4-cls-8"></path>
<path d="M310.5 330L310.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr4-cls-8"></path>
<path d="M390.5 330L390.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr4-cls-8"></path>
<path d="M470.5 330L470.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr4-cls-8"></path>
<path d="M550.5 330L550.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr4-cls-8"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr4-cls-8"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 262.5)" fill="#6E7079">50</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 195)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 127.5)" fill="#6E7079">150</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(110 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(190 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(270 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(430 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(510 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(590 338)" fill="#6E7079">Sun</text>
<path d="M82.4 330l55.2 0l0 -162l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr4-cls-9"></path>
<path d="M162.4 330l55.2 0l0 -270l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr4-cls-9"></path>
<path d="M242.4 330l55.2 0l0 -202.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr4-cls-9"></path>
<path d="M322.4 330l55.2 0l0 -108l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr4-cls-9"></path>
<path d="M402.4 330l55.2 0l0 -94.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr4-cls-9"></path>
<path d="M482.4 330l55.2 0l0 -148.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr4-cls-9"></path>
<path d="M562.4 330l55.2 0l0 -175.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr4-cls-9"></path>
<style ><![CDATA[
.zr4-cls-8:hover {
pointer-events:none;
}
.zr4-cls-9:hover {
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
<path d="M70 262.5L630 262.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 195.5L630 195.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 127.5L630 127.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
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
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 262.5)" fill="#6E7079">50</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 195)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 127.5)" fill="#6E7079">150</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(110 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(190 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(270 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(430 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(510 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(590 338)" fill="#6E7079">Sun</text>
<path d="M82.4 330l55.2 0l0 -162l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M162.4 330l55.2 0l0 -270l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M242.4 330l55.2 0l0 -202.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M322.4 330l55.2 0l0 -108l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M402.4 330l55.2 0l0 -94.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M482.4 330l55.2 0l0 -148.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M562.4 330l55.2 0l0 -175.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
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

  it('Axis Align with Tick', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=bar-tick-align example.
    const payload = `{
                       "tooltip": {
                         "trigger": "axis",
                         "axisPointer": {
                           "type": "shadow"
                         }
                       },
                       "grid": {
                         "left": "3%",
                         "right": "4%",
                         "bottom": "3%",
                         "containLabel": true
                       },
                       "xAxis": [
                         {
                           "type": "category",
                           "data": [ "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
                           "axisTick": {
                             "alignWithLabel": true
                           }
                         }
                       ],
                       "yAxis": [
                         {
                           "type": "value"
                         }
                       ],
                       "series": [
                         {
                           "name": "Direct",
                           "type": "bar",
                           "barWidth": "60%",
                           "data": [ 10, 52, 200, 334, 390, 330, 220 ]
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
<path d="M49.2 368.5L672 368.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M49.2 291.5L672 291.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M49.2 214.5L672 214.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M49.2 137.5L672 137.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M49.2 60.5L672 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M49.2 368.5L672 368.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-0"></path>
<path d="M93.5 368L93.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M182.5 368L182.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M271.5 368L271.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M360.5 368L360.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M449.5 368L449.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M538.5 368L538.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M627.5 368L627.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 368)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 291)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 214)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 137)" fill="#6E7079">300</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 60)" fill="#6E7079">400</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(93.6486 376)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(182.6257 376)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(271.6029 376)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(360.58 376)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(449.5571 376)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(538.5343 376)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(627.5114 376)" fill="#6E7079">Sun</text>
<path d="M67 368l53.4 0l0 -7.7l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M155.9 368l53.4 0l0 -40l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M244.9 368l53.4 0l0 -154l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M333.9 368l53.4 0l0 -257.2l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M422.9 368l53.4 0l0 -300.3l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M511.8 368l53.4 0l0 -254.1l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M600.8 368l53.4 0l0 -169.4l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<style ><![CDATA[
.zr0-cls-0:hover {
pointer-events:none;
}
.zr0-cls-1:hover {
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
        assert.ok(body.indexOf(`<path d="M49.2 368.5L672 368.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M49.2 291.5L672 291.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M49.2 214.5L672 214.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M49.2 137.5L672 137.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M49.2 60.5L672 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M49.2 368.5L672 368.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M93.5 368L93.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M182.5 368L182.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M271.5 368L271.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M360.5 368L360.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M449.5 368L449.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M538.5 368L538.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M627.5 368L627.5 373" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 368)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 291)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 214)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 137)" fill="#6E7079">300</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(41.16 60)" fill="#6E7079">400</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(93.6486 376)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(182.6257 376)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(271.6029 376)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(360.58 376)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(449.5571 376)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(538.5343 376)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(627.5114 376)" fill="#6E7079">Sun</text>
<path d="M67 368l53.4 0l0 -7.7l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M155.9 368l53.4 0l0 -40l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M244.9 368l53.4 0l0 -154l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M333.9 368l53.4 0l0 -257.2l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M422.9 368l53.4 0l0 -300.3l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M511.8 368l53.4 0l0 -254.1l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M600.8 368l53.4 0l0 -169.4l-53.4 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
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

  it('Bar with Background', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=bar-background example.
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
                           "data": [ 120, 200, 150, 80, 70, 110, 130 ],
                           "type": "bar",
                           "showBackground": true,
                           "backgroundStyle": {
                             "color": "rgba(180, 180, 180, 0.2)"
                           }
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
<path d="M70 262.5L630 262.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 195.5L630 195.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 127.5L630 127.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
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
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 262.5)" fill="#6E7079">50</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 195)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 127.5)" fill="#6E7079">150</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(110 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(190 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(270 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(430 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(510 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(590 338)" fill="#6E7079">Sun</text>
<path d="M82.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M162.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M242.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M322.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M402.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M482.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M562.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M82.4 330l55.2 0l0 -162l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M162.4 330l55.2 0l0 -270l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M242.4 330l55.2 0l0 -202.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M322.4 330l55.2 0l0 -108l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M402.4 330l55.2 0l0 -94.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M482.4 330l55.2 0l0 -148.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M562.4 330l55.2 0l0 -175.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<style ><![CDATA[
.zr0-cls-0:hover {
pointer-events:none;
}
.zr0-cls-1:hover {
cursor:pointer;
fill:rgba(92,123,217,1);
}

]]>

</style>
</svg>

        */

        // Check partial matches, avoiding the random class / id bits.
        assert.ok(body.indexOf('<svg width="700" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 700 400">') >= 0);
        assert.ok(body.indexOf(`<rect width="700" height="400" x="0" y="0" fill="#ffffff"></rect>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 262.5L630 262.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 195.5L630 195.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M70 127.5L630 127.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
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
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 262.5)" fill="#6E7079">50</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 195)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 127.5)" fill="#6E7079">150</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(110 338)" fill="#6E7079">Mon</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(190 338)" fill="#6E7079">Tue</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(270 338)" fill="#6E7079">Wed</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(350 338)" fill="#6E7079">Thu</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(430 338)" fill="#6E7079">Fri</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(510 338)" fill="#6E7079">Sat</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(590 338)" fill="#6E7079">Sun</text>
<path d="M82.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M162.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M242.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M322.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M402.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M482.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M562.4 60l55.2 0l0 270l-55.2 0Z" fill="rgb(180,180,180)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M82.4 330l55.2 0l0 -162l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M162.4 330l55.2 0l0 -270l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M242.4 330l55.2 0l0 -202.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M322.4 330l55.2 0l0 -108l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M402.4 330l55.2 0l0 -94.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M482.4 330l55.2 0l0 -148.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M562.4 330l55.2 0l0 -175.5l-55.2 0Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="6" ecmeta_ssr_type="chart" class="`) > 0);
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
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=... example.
    const payload = `...`;
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

        <svg ...

        //

        // Check partial matches, avoiding the random class / id bits.
        assert.ok(body.indexOf('') >= 0);
        assert.ok(body.indexOf(``) > 0);
        assert.ok(body.indexOf(``) > 0);
      });
    });
  });
  */
});
