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

describe('Pie charts', () => {
  it('Simple Pie Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=pie-simple example.
    const payload = `{
                       "title": {
                         "text": "Referer of a Website",
                         "subtext": "Fake Data",
                         "left": "center"
                       },
                       "tooltip": {
                         "trigger": "item"
                       },
                       "legend": {
                         "orient": "vertical",
                         "left": "left"
                       },
                       "series": [
                         {
                           "name": "Access From",
                           "type": "pie",
                           "radius": "50%",
                           "data": [
                             { "value": 1048, "name": "Search Engine" },
                             { "value": 735, "name": "Direct" },
                             { "value": 580, "name": "Email" },
                             { "value": 484, "name": "Union Ads" },
                             { "value": 300, "name": "Video Ads" }
                           ],
                           "emphasis": {
                             "itemStyle": {
                               "shadowBlur": 10,
                               "shadowOffsetX": 0,
                               "shadowColor": "rgba(0, 0, 0, 0.5)"
                             }
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
<polyline points="436.6 149.9 449.5 142.4 464.5 142.4" fill="none" pointer-events="visible" stroke="#5470c6" class="zr0-cls-0"></polyline>
<polyline points="381 295.1 385.7 309.3 400.7 309.3" fill="none" pointer-events="visible" stroke="#91cc75" class="zr0-cls-0"></polyline>
<polyline points="266 254.3 253.4 262.4 238.4 262.4" fill="none" pointer-events="visible" stroke="#fac858" class="zr0-cls-0"></polyline>
<polyline points="261.7 153.1 248.5 146 233.5 146" fill="none" pointer-events="visible" stroke="#ee6666" class="zr0-cls-0"></polyline>
<polyline points="320.5 104.5 316.1 90.1 301.1 90.1" fill="none" pointer-events="visible" stroke="#73c0de" class="zr0-cls-0"></polyline>
<path d="M350 100A100 100 0 0 1 436.7 249.8L350 200Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M436.7 249.8A100 100 0 0 1 309.4 291.4L350 200Z" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M309.4 291.4A100 100 0 0 1 250 199.5L350 200Z" fill="#fac858" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M250 199.5A100 100 0 0 1 293.6 117.4L350 200Z" fill="#ee6666" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<path d="M293.6 117.4A100 100 0 0 1 350 100L350 200Z" fill="#73c0de" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-5"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(469.5355 142.4006)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Search Engine</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(405.6789 309.3253)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Direct</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(233.4 262.3974)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Email</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(228.4592 146.0141)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Union Ads</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(296.0718 90.1188)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Video Ads</text>
<path d="M-5 -5l119.1 0l0 120l-119.1 0Z" transform="translate(5 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="zr0-cls-6"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 5)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(5 5)" fill="#333">Search Engine</text>
<path d="M0 0l109.1 0l0 14l-109.1 0Z" transform="translate(5 5)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 29)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(5 29)" fill="#333">Direct</text>
<path d="M0 0l61.3 0l0 14l-61.3 0Z" transform="translate(5 29)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 53)" fill="#fac858" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(5 53)" fill="#333">Email</text>
<path d="M0 0l60 0l0 14l-60 0Z" transform="translate(5 53)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 77)" fill="#ee6666" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(5 77)" fill="#333">Union Ads</text>
<path d="M0 0l85.6 0l0 14l-85.6 0Z" transform="translate(5 77)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 101)" fill="#73c0de" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="legend" ecmeta_silent="true" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(5 101)" fill="#333">Video Ads</text>
<path d="M0 0l85 0l0 14l-85 0Z" transform="translate(5 101)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="legend" class="zr0-cls-7"></path>
<path d="M-87.8 -5l175.6 0l0 50l-175.6 0Z" transform="translate(350 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="zr0-cls-6"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:18px;font-family:sans-serif;font-weight:bold;" xml:space="preserve" y="9" transform="translate(350 5)" fill="#464646">Referer of a Website</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="34" transform="translate(350 5)" fill="#6E7079">Fake Data</text>
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
        assert.ok(body.indexOf('<rect width="700" height="400" x="0" y="0" fill="#ffffff"></rect>') > 0);
        assert.ok(body.indexOf(`<polyline points="436.6 149.9 449.5 142.4 464.5 142.4" fill="none" pointer-events="visible" stroke="#5470c6" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="381 295.1 385.7 309.3 400.7 309.3" fill="none" pointer-events="visible" stroke="#91cc75" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="266 254.3 253.4 262.4 238.4 262.4" fill="none" pointer-events="visible" stroke="#fac858" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="261.7 153.1 248.5 146 233.5 146" fill="none" pointer-events="visible" stroke="#ee6666" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<polyline points="320.5 104.5 316.1 90.1 301.1 90.1" fill="none" pointer-events="visible" stroke="#73c0de" class="`) > 0);
        assert.ok(body.indexOf(`"></polyline>
<path d="M350 100A100 100 0 0 1 436.7 249.8L350 200Z" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M436.7 249.8A100 100 0 0 1 309.4 291.4L350 200Z" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M309.4 291.4A100 100 0 0 1 250 199.5L350 200Z" fill="#fac858" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M250 199.5A100 100 0 0 1 293.6 117.4L350 200Z" fill="#ee6666" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M293.6 117.4A100 100 0 0 1 350 100L350 200Z" fill="#73c0de" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(469.5355 142.4006)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Search Engine</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(405.6789 309.3253)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Direct</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" transform="translate(233.4 262.3974)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Email</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(228.4592 146.0141)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Union Ads</text>
<text dominant-baseline="central" text-anchor="end" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" transform="translate(296.0718 90.1188)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">Video Ads</text>
<path d="M-5 -5l119.1 0l0 120l-119.1 0Z" transform="translate(5 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 5)" fill="#5470c6" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(5 5)" fill="#333">Search Engine</text>
<path d="M0 0l109.1 0l0 14l-109.1 0Z" transform="translate(5 5)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 29)" fill="#91cc75" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(5 29)" fill="#333">Direct</text>
<path d="M0 0l61.3 0l0 14l-61.3 0Z" transform="translate(5 29)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 53)" fill="#fac858" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" x="30" y="7" transform="translate(5 53)" fill="#333">Email</text>
<path d="M0 0l60 0l0 14l-60 0Z" transform="translate(5 53)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 77)" fill="#ee6666" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(5 77)" fill="#333">Union Ads</text>
<path d="M0 0l85.6 0l0 14l-85.6 0Z" transform="translate(5 77)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M3.5 0L21.5 0A3.5 3.5 0 0 1 25 3.5L25 10.5A3.5 3.5 0 0 1 21.5 14L3.5 14A3.5 3.5 0 0 1 0 10.5L0 3.5A3.5 3.5 0 0 1 3.5 0" transform="translate(5 101)" fill="#73c0de" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="legend" ecmeta_silent="true" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" x="30" y="7" transform="translate(5 101)" fill="#333">Video Ads</text>
<path d="M0 0l85 0l0 14l-85 0Z" transform="translate(5 101)" fill="none" pointer-events="visible" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="legend" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M-87.8 -5l175.6 0l0 50l-175.6 0Z" transform="translate(350 5)" fill="rgb(0,0,0)" fill-opacity="0" stroke="#ccc" stroke-width="0" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="middle" style="font-size:18px;font-family:sans-serif;font-weight:bold;" xml:space="preserve" y="9" transform="translate(350 5)" fill="#464646">Referer of a Website</text>
<text dominant-baseline="central" text-anchor="middle" style="font-size:12px;font-family:sans-serif;" xml:space="preserve" y="34" transform="translate(350 5)" fill="#6E7079">Fake Data</text>
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
