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

describe('Candlestick charts', () => {
  it('Basic Candlestick', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=candlestick-simple example.
    const payload = `{
                       "xAxis": {
                         "data": ["2017-10-24", "2017-10-25", "2017-10-26", "2017-10-27"]
                       },
                       "yAxis": {},
                       "series": [
                         {
                           "type": "candlestick",
                           "data": [
                             [20, 34, 10, 38],
                             [40, 35, 30, 50],
                             [31, 38, 33, 44],
                             [38, 15, 5, 42]
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
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 276.5L630 276.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 222.5L630 222.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 168.5L630 168.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 114.5L630 114.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 60.5L630 60.5" fill="none" pointer-events="visible" stroke="#E0E6F1" class="zr0-cls-0"></path>
<path d="M70 330.5L630 330.5" fill="none" pointer-events="visible" stroke="#6E7079" stroke-linecap="round" class="zr0-cls-0"></path>
<path d="M70.5 330L70.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M210.5 330L210.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M350.5 330L350.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M490.5 330L490.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="zr0-cls-0"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 276)" fill="#6E7079">10</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 222)" fill="#6E7079">20</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 168)" fill="#6E7079">30</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 114)" fill="#6E7079">40</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">50</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(140 338)" fill="#6E7079">2017-10-24</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(280 338)" fill="#6E7079">2017-10-25</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(420 338)" fill="#6E7079">2017-10-26</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(560 338)" fill="#6E7079">2017-10-27</text>
<path d="M105.5 146.4L174.5 146.4L174.5 222L105.5 222ZM139.5 124.8L139.5 146.4M139.5 276L139.5 222" fill="#eb5454" stroke="#eb5454" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M245.5 114L314.5 114L314.5 141L245.5 141ZM279.5 60L279.5 114M279.5 168L279.5 141" fill="#47b262" stroke="#47b262" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M385.5 124.8L454.5 124.8L454.5 162.6L385.5 162.6ZM419.5 92.4L419.5 124.8M419.5 151.8L419.5 162.6" fill="#eb5454" stroke="#eb5454" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M525.5 124.8L594.5 124.8L594.5 249L525.5 249ZM559.5 103.2L559.5 124.8M559.5 303L559.5 249" fill="#47b262" stroke="#47b262" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<style ><![CDATA[
.zr0-cls-0:hover {
pointer-events:none;
}
.zr0-cls-1:hover {
cursor:pointer;
fill:rgba(255,92,92,1);
stroke-width:2;
}
.zr0-cls-2:hover {
cursor:pointer;
fill:rgba(78,195,107,1);
stroke-width:2;
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
<path d="M210.5 330L210.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M350.5 330L350.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M490.5 330L490.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M630.5 330L630.5 335" fill="none" pointer-events="visible" stroke="#6E7079" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 330)" fill="#6E7079">0</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 276)" fill="#6E7079">10</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 222)" fill="#6E7079">20</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 168)" fill="#6E7079">30</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 114)" fill="#6E7079">40</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(62 60)" fill="#6E7079">50</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(140 338)" fill="#6E7079">2017-10-24</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(280 338)" fill="#6E7079">2017-10-25</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(420 338)" fill="#6E7079">2017-10-26</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" y="6" transform="translate(560 338)" fill="#6E7079">2017-10-27</text>
<path d="M105.5 146.4L174.5 146.4L174.5 222L105.5 222ZM139.5 124.8L139.5 146.4M139.5 276L139.5 222" fill="#eb5454" stroke="#eb5454" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M245.5 114L314.5 114L314.5 141L245.5 141ZM279.5 60L279.5 114M279.5 168L279.5 141" fill="#47b262" stroke="#47b262" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M385.5 124.8L454.5 124.8L454.5 162.6L385.5 162.6ZM419.5 92.4L419.5 124.8M419.5 151.8L419.5 162.6" fill="#eb5454" stroke="#eb5454" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M525.5 124.8L594.5 124.8L594.5 249L525.5 249ZM559.5 103.2L559.5 124.8M559.5 303L559.5 249" fill="#47b262" stroke="#47b262" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<style ><![CDATA[
.`) > 0);
        assert.ok(body.indexOf(`:hover {
pointer-events:none;
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(255,92,92,1);
stroke-width:2;
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(78,195,107,1);
stroke-width:2;
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
