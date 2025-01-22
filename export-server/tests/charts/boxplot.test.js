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

describe('Boxplot charts', () => {
  it('Boxplot Light Velocity', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg',
        'X-Image-Width': 900,
        'X-Image-Height': 500
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=boxplot-light-velocity example.
    const payload = `{
                       "title": [
                         {
                           "text": "Michelson-Morley Experiment",
                           "left": "center"
                         },
                         {
                           "text": "upper: Q3 + 1.5 * IQR \\nlower: Q1 - 1.5 * IQR",
                           "borderColor": "#999",
                           "borderWidth": 1,
                           "textStyle": {
                             "fontWeight": "normal",
                             "fontSize": 14,
                             "lineHeight": 20
                           },
                           "left": "10%",
                           "top": "90%"
                         }
                       ],
                       "dataset": [
                         {
                           "source": [
                             [ 850, 740, 900, 1070, 930, 850, 950, 980, 980, 880, 1000, 980, 930, 650, 760, 810, 1000, 1000, 960, 960 ],
                             [ 960, 940, 960, 940, 880, 800, 850, 880, 900, 840, 830, 790, 810, 880, 880, 830, 800, 790, 760, 800 ],
                             [ 880, 880, 880, 860, 720, 720, 620, 860, 970, 950, 880, 910, 850, 870, 840, 840, 850, 840, 840, 840 ],
                             [ 890, 810, 810, 820, 800, 770, 760, 740, 750, 760, 910, 920, 890, 860, 880, 720, 840, 850, 850, 780 ],
                             [ 890, 840, 780, 810, 760, 810, 790, 810, 820, 850, 870, 870, 810, 740, 810, 940, 950, 800, 810, 870 ]
                           ]
                         },
                         {
                           "transform": {
                             "type": "boxplot",
                             "config": {
                               "itemNameFormatter": "expr {value}"
                             }
                           }
                         },
                         {
                           "fromDatasetIndex": 1,
                           "fromTransformResult": 1
                         }
                       ],
                       "tooltip": {
                         "trigger": "item",
                         "axisPointer": {
                           "type": "shadow"
                         }
                       },
                       "grid": {
                         "left": "10%",
                         "right": "10%",
                         "bottom": "15%"
                       },
                       "xAxis": {
                         "type": "category",
                         "boundaryGap": true,
                         "nameGap": 30,
                         "splitArea": {
                           "show": false
                         },
                         "splitLine": {
                           "show": false
                         }
                       },
                       "yAxis": {
                         "type": "value",
                         "name": "km/s minus 299,000",
                         "splitArea": {
                           "show": true
                         }
                       },
                       "series": [
                         {
                           "name": "boxplot",
                           "type": "boxplot",
                           "datasetIndex": 1
                         },
                         {
                           "name": "outlier",
                           "type": "scatter",
                           "datasetIndex": 2
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

           <svg width="900" height="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 900 500">
<rect width="900" height="500" x="0" y="0" fill="#ffffff"></rect>
<path d="M90 425l720 0l0 -60.8l-720 0Z" fill="rgb(250,250,250)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M90 364.2l720 0l0 -60.8l-720 0Z" fill="rgb(210,219,238)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M90 303.3l720 0l0 -60.8l-720 0Z" fill="rgb(250,250,250)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M90 242.5l720 0l0 -60.8l-720 0Z" fill="rgb(210,219,238)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M90 181.7l720 0l0 -60.8l-720 0Z" fill="rgb(250,250,250)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M90 120.8l720 0l0 -60.8l-720 0Z" fill="rgb(210,219,238)" fill-opacity="0.2" class="zr0-cls-0"></path>
<path d="M90 425.5L810 425.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M90 364.5L810 364.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M90 303.5L810 303.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M90 242.5L810 242.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M90 181.5L810 181.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M90 121.5L810 121.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M90 60.5L810 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="-6" transform="translate(90 45)" fill="#6E7079">km/s minus 299,000</text>
<path d="M90 425.5L810 425.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-0"></path>
<path d="M90.5 425L90.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M234.5 425L234.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M378.5 425L378.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M522.5 425L522.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M666.5 425L666.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M810.5 425L810.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 425)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 364.1667)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 303.3333)" fill="#6E7079">400</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 242.5)" fill="#6E7079">600</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 181.6667)" fill="#6E7079">800</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 120.8333)" fill="#6E7079">1,000</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 60)" fill="#6E7079">1,200</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(162 433)" fill="#6E7079">expr 0</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(306 433)" fill="#6E7079">expr 1</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(450 433)" fill="#6E7079">expr 2</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(594 433)" fill="#6E7079">expr 3</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(738 433)" fill="#6E7079">expr 4</text>
<path d="M137 166.5L187 166.5L187 126.9L137 126.9ZM162 225.8L162 166.5M162 99.5L162 126.9M137 225.8L187 225.8M137 99.5L187 99.5M137 139.1L187 139.1" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M281 181.7L331 181.7L331 155.8L281 155.8ZM306 193.8L306 181.7M306 133L306 155.8M281 193.8L331 193.8M281 133L331 133M281 168L331 168" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M425 169.5L475 169.5L475 157.3L425 157.3ZM450 187.8L450 169.5M450 139.1L450 157.3M425 187.8L475 187.8M425 139.1L475 139.1M425 164.9L475 164.9" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M569 191.6L619 191.6L619 161.9L569 161.9ZM594 206L594 191.6M594 145.2L594 161.9M569 206L619 206M569 145.2L619 145.2M569 177.1L619 177.1" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M713 179.4L763 179.4L763 160.4L713 160.4ZM738 199.9L738 179.4M738 136L738 160.4M713 199.9L763 199.9M713 136L763 136M713 178.6L763 178.6" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,162,227.2917)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,236.4167)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,206)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,206)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,136.0417)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,129.9583)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M-123.7 -5l247.4 0l0 28l-247.4 0Z" transform="translate(450 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="zr0-cls-0"></path>
<path d="M-4.5 -4.5l150 0l0 49l-150 0Z" transform="translate(95 455)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#999" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:18px;font-family:sans-serif;font-weight:bold;" xml:space="preserve" y="9" transform="translate(450 5)" fill="#464646">Michelson-Morley Experiment</text>
<path d="M0 0l140.3 0l0 40l-140.3 0Z" transform="translate(95 455)" fill="none" pointer-events="visible" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:14px;font-family:sans-serif;" xml:space="preserve" y="10" transform="translate(95 455)" fill="#464646">upper: Q3 + 1.5 * IQR </text>
<text dominant-baseline="central" text-anchor="start" style="font-size:14px;font-family:sans-serif;" xml:space="preserve" y="30" transform="translate(95 455)" fill="#464646">lower: Q1 - 1.5 * IQR</text>
<style ><![CDATA[
.zr0-cls-0:hover {
pointer-events:none;
}
.zr0-cls-1:hover {
cursor:pointer;
fill:rgba(255,255,255,1);
stroke-width:2;
}
.zr0-cls-2:hover {
cursor:pointer;
fill:rgba(159,224,128,1);
}

]]>

</style>
</svg>

        */

        // Check partial matches, avoiding the random class / id bits.
        assert.ok(body.indexOf('<svg width="900" height="500" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 900 500">') >= 0);
        assert.ok(body.indexOf('<rect width="900" height="500" x="0" y="0" fill="#ffffff"></rect>') > 0);
        assert.ok(body.indexOf(`<path d="M90 425l720 0l0 -60.8l-720 0Z" fill="rgb(250,250,250)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 364.2l720 0l0 -60.8l-720 0Z" fill="rgb(210,219,238)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 303.3l720 0l0 -60.8l-720 0Z" fill="rgb(250,250,250)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 242.5l720 0l0 -60.8l-720 0Z" fill="rgb(210,219,238)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 181.7l720 0l0 -60.8l-720 0Z" fill="rgb(250,250,250)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 120.8l720 0l0 -60.8l-720 0Z" fill="rgb(210,219,238)" fill-opacity="0.2" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 425.5L810 425.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 364.5L810 364.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 303.5L810 303.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 242.5L810 242.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 181.5L810 181.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 121.5L810 121.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90 60.5L810 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="-6" transform="translate(90 45)" fill="#6E7079">km/s minus 299,000</text>
<path d="M90 425.5L810 425.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M90.5 425L90.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M234.5 425L234.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M378.5 425L378.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M522.5 425L522.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M666.5 425L666.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M810.5 425L810.5 430" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 425)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 364.1667)" fill="#6E7079">200</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 303.3333)" fill="#6E7079">400</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 242.5)" fill="#6E7079">600</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 181.6667)" fill="#6E7079">800</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 120.8333)" fill="#6E7079">1,000</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(82 60)" fill="#6E7079">1,200</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(162 433)" fill="#6E7079">expr 0</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(306 433)" fill="#6E7079">expr 1</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(450 433)" fill="#6E7079">expr 2</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(594 433)" fill="#6E7079">expr 3</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="6" transform="translate(738 433)" fill="#6E7079">expr 4</text>
<path d="M137 166.5L187 166.5L187 126.9L137 126.9ZM162 225.8L162 166.5M162 99.5L162 126.9M137 225.8L187 225.8M137 99.5L187 99.5M137 139.1L187 139.1" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M281 181.7L331 181.7L331 155.8L281 155.8ZM306 193.8L306 181.7M306 133L306 155.8M281 193.8L331 193.8M281 133L331 133M281 168L331 168" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M425 169.5L475 169.5L475 157.3L425 157.3ZM450 187.8L450 169.5M450 139.1L450 157.3M425 187.8L475 187.8M425 139.1L475 139.1M425 164.9L475 164.9" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M569 191.6L619 191.6L619 161.9L569 161.9ZM594 206L594 191.6M594 145.2L594 161.9M569 206L619 206M569 145.2L619 145.2M569 177.1L619 177.1" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M713 179.4L763 179.4L763 160.4L713 160.4ZM738 199.9L738 179.4M738 136L738 160.4M713 199.9L763 199.9M713 136L763 136M713 178.6L763 178.6" fill="#fff" stroke="#5470c6" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,162,227.2917)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,236.4167)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,206)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,206)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,136.0417)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M1 0A1 1 0 1 1 1 -0.1A1 1 0 0 1 1 0" transform="matrix(5,0,0,5,450,129.9583)" fill="#91cc75" fill-opacity="0.8" ecmeta_series_index="1" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M-123.7 -5l247.4 0l0 28l-247.4 0Z" transform="translate(450 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M-4.5 -4.5l150 0l0 49l-150 0Z" transform="translate(95 455)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#999" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:18px;font-family:sans-serif;font-weight:bold;" xml:space="preserve" y="9" transform="translate(450 5)" fill="#464646">Michelson-Morley Experiment</text>
<path d="M0 0l140.3 0l0 40l-140.3 0Z" transform="translate(95 455)" fill="none" pointer-events="visible" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:14px;font-family:sans-serif;" xml:space="preserve" y="10" transform="translate(95 455)" fill="#464646">upper: Q3 + 1.5 * IQR </text>
<text dominant-baseline="central" text-anchor="start" style="font-size:14px;font-family:sans-serif;" xml:space="preserve" y="30" transform="translate(95 455)" fill="#464646">lower: Q1 - 1.5 * IQR</text>
<style ><![CDATA[
.`) > 0);
        assert.ok(body.indexOf(`:hover {
pointer-events:none;
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(255,255,255,1);
stroke-width:2;
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(159,224,128,1);
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
