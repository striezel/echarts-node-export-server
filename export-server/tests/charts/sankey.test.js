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

describe('Sankey charts', () => {
  it('Basic Sankey Chart', () => {
    const options = {
      port: 3000,
      host: 'localhost',
      method: 'POST',
      headers: {
        'X-Image-Format': 'svg'
      }
    };

    const req = http.request(options);
    // Data taken from https://echarts.apache.org/examples/en/editor.html?c=sankey-simple example.
    const payload = `{
                       "series": {
                         "type": "sankey",
                         "layout": "none",
                         "emphasis": {
                           "focus": "adjacency"
                         },
                         "data": [
                           { "name": "a" },
                           { "name": "b" },
                           { "name": "a1" },
                           { "name": "a2" },
                           { "name": "b1" },
                           { "name": "c" }
                         ],
                         "links": [
                           { "source": "a", "target": "a1", "value": 5 },
                           { "source": "a", "target": "a2", "value": 3 },
                           { "source": "b", "target": "b1", "value": 8 },
                           { "source": "a", "target": "b1", "value": 3 },
                           { "source": "b1", "target": "a1", "value": 1 },
                           { "source": "b1", "target": "c", "value": 2 }
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
<path d="M20 0C262.5 0 262.5 68.1 505 68.1L505 160.7C262.5 160.7 262.5 92.6 20 92.6Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-0"></path>
<path d="M20 148.2C262.5 148.2 262.5 187.2 505 187.2L505 242.8C262.5 242.8 262.5 203.8 20 203.8Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-0"></path>
<path d="M20 211.8C136.3 211.8 136.3 186.2 252.5 186.2L252.5 334.4C136.3 334.4 136.3 360 20 360Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-0"></path>
<path d="M20 92.6C136.3 92.6 136.3 130.6 252.5 130.6L252.5 186.2C136.3 186.2 136.3 148.2 20 148.2Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-0"></path>
<path d="M272.5 130.6C388.8 130.6 388.8 160.7 505 160.7L505 179.2C388.8 179.2 388.8 149.1 272.5 149.1Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-0"></path>
<path d="M272.5 149.1C388.8 149.1 388.8 250.8 505 250.8L505 287.9C388.8 287.9 388.8 186.2 272.5 186.2Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-0"></path>
<path d="M0 0l20 0l0 203.8l-20 0Z" transform="translate(35 20)" fill="rgb(234,124,204)" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M0 211.8l20 0l0 148.2l-20 0Z" transform="translate(35 20)" fill="rgb(123,152,103)" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="zr0-cls-2"></path>
<path d="M505 68.1l20 0l0 111.2l-20 0Z" transform="translate(35 20)" fill="rgb(170,152,169)" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="zr0-cls-3"></path>
<path d="M505 187.2l20 0l0 55.6l-20 0Z" transform="translate(35 20)" fill="rgb(138,194,126)" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="zr0-cls-4"></path>
<path d="M252.5 130.6l20 0l0 203.8l-20 0Z" transform="translate(35 20)" fill="rgb(234,124,204)" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="zr0-cls-1"></path>
<path d="M505 250.8l20 0l0 37.1l-20 0Z" transform="translate(35 20)" fill="rgb(84,112,198)" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="zr0-cls-5"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(60 121.8947)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">a</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(60 305.8947)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">b</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(565 143.667)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">a1</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(565 235.0355)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">a2</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(312.5 252.5022)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">b1</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(565 289.3513)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">c</text>
<style ><![CDATA[
.zr0-cls-0:hover {
cursor:pointer;
fill:rgba(53,77,94,1);
}
.zr0-cls-1:hover {
cursor:pointer;
fill:rgba(255,136,224,1);
}
.zr0-cls-2:hover {
cursor:pointer;
fill:rgba(135,167,113,1);
}
.zr0-cls-3:hover {
cursor:pointer;
fill:rgba(187,167,185,1);
}
.zr0-cls-4:hover {
cursor:pointer;
fill:rgba(151,213,138,1);
}
.zr0-cls-5:hover {
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
        assert.ok(body.indexOf(`<path d="M20 0C262.5 0 262.5 68.1 505 68.1L505 160.7C262.5 160.7 262.5 92.6 20 92.6Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M20 148.2C262.5 148.2 262.5 187.2 505 187.2L505 242.8C262.5 242.8 262.5 203.8 20 203.8Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M20 211.8C136.3 211.8 136.3 186.2 252.5 186.2L252.5 334.4C136.3 334.4 136.3 360 20 360Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M20 92.6C136.3 92.6 136.3 130.6 252.5 130.6L252.5 186.2C136.3 186.2 136.3 148.2 20 148.2Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M272.5 130.6C388.8 130.6 388.8 160.7 505 160.7L505 179.2C388.8 179.2 388.8 149.1 272.5 149.1Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M272.5 149.1C388.8 149.1 388.8 250.8 505 250.8L505 287.9C388.8 287.9 388.8 186.2 272.5 186.2Z" transform="translate(35 20)" fill="#314656" fill-opacity="0.2" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M0 0l20 0l0 203.8l-20 0Z" transform="translate(35 20)" fill="rgb(234,124,204)" ecmeta_series_index="0" ecmeta_data_index="0" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M0 211.8l20 0l0 148.2l-20 0Z" transform="translate(35 20)" fill="rgb(123,152,103)" ecmeta_series_index="0" ecmeta_data_index="1" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M505 68.1l20 0l0 111.2l-20 0Z" transform="translate(35 20)" fill="rgb(170,152,169)" ecmeta_series_index="0" ecmeta_data_index="2" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M505 187.2l20 0l0 55.6l-20 0Z" transform="translate(35 20)" fill="rgb(138,194,126)" ecmeta_series_index="0" ecmeta_data_index="3" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M252.5 130.6l20 0l0 203.8l-20 0Z" transform="translate(35 20)" fill="rgb(234,124,204)" ecmeta_series_index="0" ecmeta_data_index="4" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<path d="M505 250.8l20 0l0 37.1l-20 0Z" transform="translate(35 20)" fill="rgb(84,112,198)" ecmeta_series_index="0" ecmeta_data_index="5" ecmeta_ssr_type="chart" class="`) > 0);
        assert.ok(body.indexOf(`"></path>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(60 121.8947)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">a</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(60 305.8947)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">b</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(565 143.667)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">a1</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(565 235.0355)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">a2</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(312.5 252.5022)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">b1</text>
<text dominant-baseline="central" text-anchor="start" style="font-size:12px;font-family:sans-serif;" transform="translate(565 289.3513)" fill="#333" stroke="rgb(255,255,255)" stroke-width="2" paint-order="stroke" stroke-miterlimit="2">c</text>
<style ><![CDATA[
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(53,77,94,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(255,136,224,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(135,167,113,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(187,167,185,1);
}
.`) > 0);
        assert.ok(body.indexOf(`:hover {
cursor:pointer;
fill:rgba(151,213,138,1);
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
