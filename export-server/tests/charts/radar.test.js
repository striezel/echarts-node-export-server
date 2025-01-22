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

describe('Radar charts', () => {
  it('Basic Radar Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=radar example.
    const payload = `{
                       "title": {
                         "text": "Basic Radar Chart"
                       },
                       "legend": {
                         "data": ["Allocated Budget", "Actual Spending"]
                       },
                       "radar": {
                         "indicator": [
                           { "name": "Sales", "max": 6500 },
                           { "name": "Administration", "max": 16000 },
                           { "name": "Information Technology", "max": 30000 },
                           { "name": "Customer Support", "max": 38000 },
                           { "name": "Development", "max": 52000 },
                           { "name": "Marketing", "max": 25000 }
                         ]
                       },
                       "series": [
                         {
                           "name": "Budget vs. spending",
                           "type": "radar",
                           "data": [
                             {
                               "value": [4200, 3000, 20000, 35000, 50000, 18000],
                               "name": "Allocated Budget"
                             },
                             {
                               "value": [5000, 14000, 28000, 26000, 42000, 21000],
                               "name": "Actual Spending"
                             }
                           ]
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
<path d="M350 170L324 185L324 215L350 230L376 215L376 185L350 170L350 200ZM350 110L272.1 155L272.1 245L350 290L427.9 245L427.9 155L350 110L350 140L402 170L402 230L350 260L298 230L298 170L350 140ZM350 50L220.1 125L220.1 275L350 350L479.9 275L479.9 125L350 50L350 80L453.9 140L453.9 260L350 320L246.1 260L246.1 140L350 80Z" fill="rgb(250,250,250)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M350 140L298 170L298 230L350 260L402 230L402 170L350 140L350 170L376 185L376 215L350 230L324 215L324 185L350 170ZM350 80L246.1 140L246.1 260L350 320L453.9 260L453.9 140L350 80L350 110L427.9 155L427.9 245L350 290L272.1 245L272.1 155L350 110Z" fill="rgb(210,219,238)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M350 200M350 170L324 185L324 215L350 230L376 215L376 185L350 170M350 140L298 170L298 230L350 260L402 230L402 170L350 140M350 110L272.1 155L272.1 245L350 290L427.9 245L427.9 155L350 110M350 80L246.1 140L246.1 260L350 320L453.9 260L453.9 140L350 80M350 50L220.1 125L220.1 275L350 350L479.9 275L479.9 125L350 50" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M350.5 200L350.5 50" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="-6" transform="translate(350 35)" fill="#bbb">Sales</text>
<path d="M350 200L220.1 125" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(207.1058 117.5)" fill="#bbb">Administration</text>
<path d="M350 200L220.1 275" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(207.1058 282.5)" fill="#bbb">Information Technology</text>
<path d="M350.5 200L350.5 350" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(350 365)" fill="#bbb">Customer Support</text>
<path d="M350 200L479.9 275" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(492.8942 282.5)" fill="#bbb">Development</text>
<path d="M350 200L479.9 125" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(492.8942 117.5)" fill="#bbb">Marketing</text>
<polyline points="350 103.1 325.6 185.9 263.4 250 350 338.2 474.9 272.1 443.5 146 350 103.1" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-1"></polyline>
<polyline points="350 84.6 236.3 134.4 228.8 270 350 302.6 454.9 260.6 459.1 137 350 84.6" fill="none" pointer-events="visible" stroke="#91cc75" stroke-width="2" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-1"></polyline>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,350,103.0769)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,325.643,185.9375)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,263.3975,250)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,350,338.1579)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,474.9075,272.1154)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,443.5307,146)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,350,84.6154)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,236.3342,134.375)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,228.7564,270)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,350,302.6316)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,454.9223,260.5769)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,459.1192,137)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M-5 -5l259 0l0 24l-259 0Z" transform="translate(225.48 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="zr0-cls-0"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(225.48 5)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(225.48 5)" fill="#333">Allocated Budget</text>
<path d="M0 0l121.2 0l0 14l-121.2 0Z" transform="translate(225.48 5)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" class="zr0-cls-4"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(356.68 5)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(356.68 5)" fill="#333">Actual Spending</text>
<path d="M0 0l117.8 0l0 14l-117.8 0Z" transform="translate(356.68 5)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" class="zr0-cls-4"></path>
<path d="M-5 -5l157.4 0l0 28l-157.4 0Z" transform="translate(5 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:18px;font-family:sans-serif;font-weight:bold;" xml:space="preserve" y="9" transform="translate(5 5)" fill="#464646">Basic Radar Chart</text>
<style ><![CDATA[
.zr0-cls-0:hover {
pointer-events:none;
}
.zr0-cls-1:hover {
cursor:pointer;
}
.zr0-cls-2:hover {
cursor:pointer;
fill:rgba(92,123,217,1);
}
.zr0-cls-3:hover {
cursor:pointer;
fill:rgba(159,224,128,1);
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
        assert.ok(body.indexOf('<rect width="700" height="400" x="0" y="0" fill="#ffffff"></rect>') > 0);
        assert.ok(body.indexOf(`<path d="M350 170L324 185L324 215L350 230L376 215L376 185L350 170L350 200ZM350 110L272.1 155L272.1 245L350 290L427.9 245L427.9 155L350 110L350 140L402 170L402 230L350 260L298 230L298 170L350 140ZM350 50L220.1 125L220.1 275L350 350L479.9 275L479.9 125L350 50L350 80L453.9 140L453.9 260L350 320L246.1 260L246.1 140L350 80Z" fill="rgb(250,250,250)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M350 140L298 170L298 230L350 260L402 230L402 170L350 140L350 170L376 185L376 215L350 230L324 215L324 185L350 170ZM350 80L246.1 140L246.1 260L350 320L453.9 260L453.9 140L350 80L350 110L427.9 155L427.9 245L350 290L272.1 245L272.1 155L350 110Z" fill="rgb(210,219,238)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M350 200M350 170L324 185L324 215L350 230L376 215L376 185L350 170M350 140L298 170L298 230L350 260L402 230L402 170L350 140M350 110L272.1 155L272.1 245L350 290L427.9 245L427.9 155L350 110M350 80L246.1 140L246.1 260L350 320L453.9 260L453.9 140L350 80M350 50L220.1 125L220.1 275L350 350L479.9 275L479.9 125L350 50" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M350.5 200L350.5 50" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="-6" transform="translate(350 35)" fill="#bbb">Sales</text>
<path d="M350 200L220.1 125" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(207.1058 117.5)" fill="#bbb">Administration</text>
<path d="M350 200L220.1 275" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(207.1058 282.5)" fill="#bbb">Information Technology</text>
<path d="M350.5 200L350.5 350" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(350 365)" fill="#bbb">Customer Support</text>
<path d="M350 200L479.9 275" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(492.8942 282.5)" fill="#bbb">Development</text>
<path d="M350 200L479.9 125" fill="none" pointer-events="visible" stroke="#bbb" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(492.8942 117.5)" fill="#bbb">Marketing</text>
<polyline points="350 103.1 325.6 185.9 263.4 250 350 338.2 474.9 272.1 443.5 146 350 103.1" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="2" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="350 84.6 236.3 134.4 228.8 270 350 302.6 454.9 260.6 459.1 137 350 84.6" fill="none" pointer-events="visible" stroke="#91cc75" stroke-width="2" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,350,103.0769)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,325.643,185.9375)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,263.3975,250)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,350,338.1579)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,474.9075,272.1154)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,443.5307,146)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,350,84.6154)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,236.3342,134.375)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,228.7564,270)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,350,302.6316)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,454.9223,260.5769)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(4,0,0,4,459.1192,137)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M-5 -5l259 0l0 24l-259 0Z" transform="translate(225.48 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(225.48 5)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(225.48 5)" fill="#333">Allocated Budget</text>
<path d="M0 0l121.2 0l0 14l-121.2 0Z" transform="translate(225.48 5)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(356.68 5)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(356.68 5)" fill="#333">Actual Spending</text>
<path d="M0 0l117.8 0l0 14l-117.8 0Z" transform="translate(356.68 5)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M-5 -5l157.4 0l0 28l-157.4 0Z" transform="translate(5 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:18px;font-family:sans-serif;font-weight:bold;" xml:space="preserve" y="9" transform="translate(5 5)" fill="#464646">Basic Radar Chart</text>
<style ><![CDATA[
.`) > 0);
        assert.ok(body.indexOf(`:hover {
pointer-events:none;
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(92,123,217,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(159,224,128,1);
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
