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

describe('Parallel charts', () => {
  it('Basic Parallel Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=parallel-simple example.
    const payload = `{
                       "parallelAxis": [
                         { "dim": 0, "name": "Price" },
                         { "dim": 1, "name": "Net Weight" },
                         { "dim": 2, "name": "Amount" },
                         {
                           "dim": 3,
                           "name": "Score",
                           "type": "category",
                           "data": ["Excellent", "Good", "OK", "Bad"]
                         }
                       ],
                       "series": {
                         "type": "parallel",
                         "lineStyle": {
                           "width": 4
                         },
                         "data": [
                           [12.99, 100, 82, "Good"],
                           [9.99, 80, 77, "OK"],
                           [20, 120, 60, "Excellent"]
                         ]
                       },
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
<g clip-path="url(#zr0-c0)">
<polyline points="80 158.1 260 106.7 440 110.4 620 235" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="4" stroke-opacity="0.45" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-1"></polyline>
<polyline points="80 200.1 260 153.3 440 124.4 620 165" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="4" stroke-opacity="0.45" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-1"></polyline>
<polyline points="80 60 260 60 440 172 620 305" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="4" stroke-opacity="0.45" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-1"></polyline>
</g>
<path d="M80.5 340L80.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-2"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="-6" transform="translate(80 45)" fill="#6E7079">Price</text>
<path d="M260.5 340L260.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-2"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="-6" transform="translate(260 45)" fill="#6E7079">Net Weight</text>
<path d="M440.5 340L440.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-2"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="-6" transform="translate(440 45)" fill="#6E7079">Amount</text>
<path d="M620.5 340L620.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-2"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="-6" transform="translate(620 45)" fill="#6E7079">Score</text>
<path d="M80 340.5L85 340.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M80 270.5L85 270.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M80 200.5L85 200.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M80 130.5L85 130.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M80 60.5L85 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M260 340.5L265 340.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M260 293.5L265 293.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M260 246.5L265 246.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M260 200.5L265 200.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M260 153.5L265 153.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M260 106.5L265 106.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M260 60.5L265 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M440 340.5L445 340.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M440 284.5L445 284.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M440 228.5L445 228.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M440 172.5L445 172.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M440 116.5L445 116.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M440 60.5L445 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M620 340.5L625 340.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M620 270.5L625 270.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M620 200.5L625 200.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M620 130.5L625 130.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<path d="M620 60.5L625 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-2"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 340)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 270)" fill="#6E7079">5</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 200)" fill="#6E7079">10</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 130)" fill="#6E7079">15</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 60)" fill="#6E7079">20</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 340)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 293.3333)" fill="#6E7079">20</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 246.6667)" fill="#6E7079">40</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 200)" fill="#6E7079">60</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 153.3333)" fill="#6E7079">80</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 106.6667)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 60)" fill="#6E7079">120</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 340)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 284)" fill="#6E7079">20</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 228)" fill="#6E7079">40</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 172)" fill="#6E7079">60</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 116)" fill="#6E7079">80</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 60)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(628 305)" fill="#6E7079">Excellent</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(628 235)" fill="#6E7079">Good</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(628 165)" fill="#6E7079">OK</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(628 95)" fill="#6E7079">Bad</text>
<defs >
<clipPath id="zr0-c0">
<path d="M80 60l540 0l0 280l-540 0Z" fill="#000" class="zr0-cls-0"></path>
</clipPath>
</defs>
<style ><![CDATA[
.zr0-cls-0:hover {
cursor:pointer;
fill:rgba(0,0,0,1);
}
.zr0-cls-1:hover {
cursor:pointer;
}
.zr0-cls-2:hover {
pointer-events:none;
}

]]>

</style>
</svg>
        
        */

        // Check partial matches, avoiding the random class / id bits.
        assert.ok(body.indexOf('<svg width="700" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 700 400">') >= 0);
        assert.ok(body.indexOf('<rect width="700" height="400" x="0" y="0" fill="#ffffff"></rect>') > 0);
        assert.ok(body.indexOf(`<g clip-path="url(#`) > 0);
        assert.ok(body.indexOf(`)">
<polyline points="80 158.1 260 106.7 440 110.4 620 235" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="4" stroke-opacity="0.45" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="80 200.1 260 153.3 440 124.4 620 165" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="4" stroke-opacity="0.45" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="80 60 260 60 440 172 620 305" fill="none" pointer-events="visible" stroke="#5470c6" stroke-width="4" stroke-opacity="0.45" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
</g>
<path d="M80.5 340L80.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="-6" transform="translate(80 45)" fill="#6E7079">Price</text>
<path d="M260.5 340L260.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="-6" transform="translate(260 45)" fill="#6E7079">Net Weight</text>
<path d="M440.5 340L440.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="-6" transform="translate(440 45)" fill="#6E7079">Amount</text>
<path d="M620.5 340L620.5 60" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="-6" transform="translate(620 45)" fill="#6E7079">Score</text>
<path d="M80 340.5L85 340.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M80 270.5L85 270.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M80 200.5L85 200.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M80 130.5L85 130.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M80 60.5L85 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M260 340.5L265 340.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M260 293.5L265 293.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M260 246.5L265 246.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M260 200.5L265 200.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M260 153.5L265 153.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M260 106.5L265 106.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M260 60.5L265 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M440 340.5L445 340.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M440 284.5L445 284.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M440 228.5L445 228.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M440 172.5L445 172.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M440 116.5L445 116.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M440 60.5L445 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M620 340.5L625 340.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M620 270.5L625 270.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M620 200.5L625 200.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M620 130.5L625 130.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M620 60.5L625 60.5" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 340)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 270)" fill="#6E7079">5</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 200)" fill="#6E7079">10</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 130)" fill="#6E7079">15</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(88 60)" fill="#6E7079">20</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 340)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 293.3333)" fill="#6E7079">20</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 246.6667)" fill="#6E7079">40</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 200)" fill="#6E7079">60</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 153.3333)" fill="#6E7079">80</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 106.6667)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(268 60)" fill="#6E7079">120</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 340)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 284)" fill="#6E7079">20</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 228)" fill="#6E7079">40</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 172)" fill="#6E7079">60</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 116)" fill="#6E7079">80</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(448 60)" fill="#6E7079">100</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(628 305)" fill="#6E7079">Excellent</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(628 235)" fill="#6E7079">Good</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(628 165)" fill="#6E7079">OK</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(628 95)" fill="#6E7079">Bad</text>
<defs >
<clipPath id="`) > 0);
        assert.ok(body.indexOf(`">
<path d="M80 60l540 0l0 280l-540 0Z" fill="#000" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
</clipPath>
</defs>
<style ><![CDATA[
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
pointer-events:none;
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
