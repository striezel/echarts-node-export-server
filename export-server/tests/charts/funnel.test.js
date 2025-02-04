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

describe('Funnel charts', () => {
  it('Basic Funnel Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=funnel example.
    const payload = `{
                       "title": {
                         "text": "Funnel"
                       },
                       "legend": {
                         "data": [ "Show", "Click", "Visit", "Inquiry", "Order" ]
                       },
                       "series": [
                         {
                           "name": "Funnel",
                           "type": "funnel",
                           "left": "10%",
                           "top": 60,
                           "bottom": 60,
                           "width": "80%",
                           "min": 0,
                           "max": 100,
                           "minSize": "0%",
                           "maxSize": "100%",
                           "sort": "descending",
                           "gap": 2,
                           "label": {
                             "show": true,
                             "position": "inside"
                           },
                           "labelLine": {
                             "length": 10,
                             "lineStyle": {
                               "width": 1,
                               "type": "solid"
                             }
                           },
                           "itemStyle": {
                             "borderColor": "#fff",
                             "borderWidth": 1
                           },
                           "emphasis": {
                             "label": {
                               "fontSize": 20
                             }
                           },
                           "data": [
                             { "value": 60, "name": "Visit" },
                             { "value": 40, "name": "Inquiry" },
                             { "value": 20, "name": "Order" },
                             { "value": 80, "name": "Click" },
                             { "value": 100, "name": "Show" }
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
<polyline points="350 200 350 200" fill="none" pointer-events="visible" stroke="#5470c6" class="zr0-cls-0"></polyline>
<polyline points="350 256.4 350 256.4" fill="none" pointer-events="visible" stroke="#91cc75" class="zr0-cls-0"></polyline>
<polyline points="350 312.8 350 312.8" fill="none" pointer-events="visible" stroke="#fac858" class="zr0-cls-0"></polyline>
<polyline points="350 143.6 350 143.6" fill="none" pointer-events="visible" stroke="#ee6666" class="zr0-cls-0"></polyline>
<polyline points="350 87.2 350 87.2" fill="none" pointer-events="visible" stroke="#73c0de" class="zr0-cls-0"></polyline>
<polygon points="182 172.8 518 172.8 462 227.2 238 227.2" fill="#5470c6" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-1"></polygon>
<polygon points="238 229.2 462 229.2 406 283.6 294 283.6" fill="#91cc75" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-2"></polygon>
<polygon points="294 285.6 406 285.6 350 340 350 340" fill="#fac858" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-3"></polygon>
<polygon points="126 116.4 574 116.4 518 170.8 182 170.8" fill="#ee6666" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-4"></polygon>
<polygon points="70 60 630 60 574 114.4 126 114.4" fill="#73c0de" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-5"></polygon>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="200.00000000000003" fill="#eee" stroke="#5470c6" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Visit</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="256.4" fill="#333" stroke="#91cc75" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Inquiry</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="312.8" fill="#333" stroke="#fac858" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Order</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="143.60000000000002" fill="#333" stroke="#ee6666" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Click</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="87.2" fill="#333" stroke="#73c0de" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Show</text>
<path d="M-5 -5l350.6 0l0 26l-350.6 0Z" transform="translate(179.72 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="zr0-cls-6"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(180.72 6)" fill="#73c0de" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(180.72 6)" fill="#333">Show</text>
<path d="M-1 -1l61.1 0l0 16l-61.1 0Z" transform="translate(180.72 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(251.84 6)" fill="#ee6666" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(251.84 6)" fill="#333">Click</text>
<path d="M-1 -1l56.9 0l0 16l-56.9 0Z" transform="translate(251.84 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(318.76 6)" fill="#5470c6" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(318.76 6)" fill="#333">Visit</text>
<path d="M-1 -1l53.7 0l0 16l-53.7 0Z" transform="translate(318.76 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(382.44 6)" fill="#91cc75" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(382.44 6)" fill="#333">Inquiry</text>
<path d="M-1 -1l67.1 0l0 16l-67.1 0Z" transform="translate(382.44 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(459.56 6)" fill="#fac858" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(459.56 6)" fill="#333">Order</text>
<path d="M-1 -1l61.7 0l0 16l-61.7 0Z" transform="translate(459.56 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M-5 -5l65.3 0l0 28l-65.3 0Z" transform="translate(5 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:18px;font-family:sans-serif;font-weight:bold;" y="9" transform="translate(5 5)" fill="#464646">Funnel</text>
<style ><![CDATA[
.zr0-cls-0:hover {
cursor:pointer;
}
.zr0-cls-1:hover {
cursor:pointer;
fill:rgba(92,123,217,1);
}
.zr0-cls-2:hover {
cursor:pointer;
fill:rgba(159,224,128,1);
}
.zr0-cls-3:hover {
cursor:pointer;
fill:rgba(255,220,96,1);
}
.zr0-cls-4:hover {
cursor:pointer;
fill:rgba(255,112,112,1);
}
.zr0-cls-5:hover {
cursor:pointer;
fill:rgba(126,211,244,1);
}
.zr0-cls-6:hover {
pointer-events:none;
}
.zr0-cls-7:hover {
cursor:pointer;
fill:rgba(0,0,0,0);
}

]]>

</style>
</svg>

        */

        // Check partial matches, avoiding the random class / id bits.
        assert.ok(body.indexOf('<svg width="700" height="400" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" baseProfile="full" viewBox="0 0 700 400">') >= 0);
        assert.ok(body.indexOf(`<rect width="700" height="400" x="0" y="0" fill="#ffffff"></rect>
<polyline points="350 200 350 200" fill="none" pointer-events="visible" stroke="#5470c6" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="350 256.4 350 256.4" fill="none" pointer-events="visible" stroke="#91cc75" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="350 312.8 350 312.8" fill="none" pointer-events="visible" stroke="#fac858" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="350 143.6 350 143.6" fill="none" pointer-events="visible" stroke="#ee6666" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="350 87.2 350 87.2" fill="none" pointer-events="visible" stroke="#73c0de" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polygon points="182 172.8 518 172.8 462 227.2 238 227.2" fill="#5470c6" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polygon>
<polygon points="238 229.2 462 229.2 406 283.6 294 283.6" fill="#91cc75" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polygon>
<polygon points="294 285.6 406 285.6 350 340 350 340" fill="#fac858" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polygon>
<polygon points="126 116.4 574 116.4 518 170.8 182 170.8" fill="#ee6666" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polygon>
<polygon points="70 60 630 60 574 114.4 126 114.4" fill="#73c0de" stroke="#fff" stroke-linejoin="round" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></polygon>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="200.00000000000003" fill="#eee" stroke="#5470c6" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Visit</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="256.4" fill="#333" stroke="#91cc75" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Inquiry</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="312.8" fill="#333" stroke="#fac858" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Order</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="143.60000000000002" fill="#333" stroke="#ee6666" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Click</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" x="350" y="87.2" fill="#333" stroke="#73c0de" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Show</text>
<path d="M-5 -5l350.6 0l0 26l-350.6 0Z" transform="translate(179.72 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(180.72 6)" fill="#73c0de" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(180.72 6)" fill="#333">Show</text>
<path d="M-1 -1l61.1 0l0 16l-61.1 0Z" transform="translate(180.72 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(251.84 6)" fill="#ee6666" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(251.84 6)" fill="#333">Click</text>
<path d="M-1 -1l56.9 0l0 16l-56.9 0Z" transform="translate(251.84 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(318.76 6)" fill="#5470c6" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(318.76 6)" fill="#333">Visit</text>
<path d="M-1 -1l53.7 0l0 16l-53.7 0Z" transform="translate(318.76 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(382.44 6)" fill="#91cc75" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(382.44 6)" fill="#333">Inquiry</text>
<path d="M-1 -1l67.1 0l0 16l-67.1 0Z" transform="translate(382.44 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(459.56 6)" fill="#fac858" stroke="#fff" stroke-width="2" stroke-linecap="butt" stroke-miterlimit="10" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(459.56 6)" fill="#333">Order</text>
<path d="M-1 -1l61.7 0l0 16l-61.7 0Z" transform="translate(459.56 6)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M-5 -5l65.3 0l0 28l-65.3 0Z" transform="translate(5 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:18px;font-family:sans-serif;font-weight:bold;" y="9" transform="translate(5 5)" fill="#464646">Funnel</text>
<style ><![CDATA[
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
fill:rgba(255,220,96,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(255,112,112,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(126,211,244,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
pointer-events:none;
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
