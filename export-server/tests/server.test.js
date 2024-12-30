/*
    ECharts offline image export server with Node.js test suite
    Copyright (C) 2023, 2024  Dirk Stolle

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

describe('server', () => {
  describe('request to non-root URL is not acceptable', () => {
    it('HTTP status code 404 when another URL is requested', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'POST',
        path: '/foo.svg'
      };

      const req = http.request(options);
      req.end();

      req.on('response', (response) => {
        assert.strictEqual(404, response.statusCode);
      });
    });
  });

  describe('only POST method is allowed', () => {
    it('HTTP status code 405 when DELETE is used', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'DELETE',
      };

      const req = http.request(options);
      req.end();

      req.on('response', (response) => {
        assert.strictEqual(405, response.statusCode);
        assert.ok(response.headers['allow']);
        assert.strictEqual(response.headers['allow'], 'POST');
      });
    });

    it('HTTP status code 405 when GET is used', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'GET',
      };

      const req = http.request(options);
      req.end();

      req.on('response', (response) => {
        assert.strictEqual(405, response.statusCode);
        assert.ok(response.headers['allow']);
        assert.strictEqual(response.headers['allow'], 'POST');
      });
    });

    it('HTTP status code 405 when HEAD is used', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'HEAD',
      };

      const req = http.request(options);
      req.end();

      req.on('response', (response) => {
        assert.strictEqual(405, response.statusCode);
        assert.ok(response.headers['allow']);
        assert.strictEqual(response.headers['allow'], 'POST');
      });
    });

    it('HTTP status code 405 when PATCH is used', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'PATCH',
      };

      const req = http.request(options);
      req.end();

      req.on('response', (response) => {
        assert.strictEqual(405, response.statusCode);
        assert.ok(response.headers['allow']);
        assert.strictEqual(response.headers['allow'], 'POST');
      });
    });

    it('HTTP status code 405 when PUT is used', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'PUT',
      };

      const req = http.request(options);
      req.end();

      req.on('response', (response) => {
        assert.strictEqual(405, response.statusCode);
        assert.ok(response.headers['allow']);
        assert.strictEqual(response.headers['allow'], 'POST');
      });
    });

    it('HTTP status code 405 when TRACE is used', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'TRACE',
      };

      const req = http.request(options);
      req.end();

      req.on('response', (response) => {
        assert.strictEqual(405, response.statusCode);
        assert.ok(response.headers['allow']);
        assert.strictEqual(response.headers['allow'], 'POST');
      });
    });
  });

  describe('query available methods via OPTIONS', () => {
    it('HTTP status code 204 and Allow header for OPTIONS', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'OPTIONS',
      };

      const req = http.request(options);
      req.end();

      req.on('response', (response) => {
        // 204: no content
        assert.strictEqual(204, response.statusCode);
        // Response shall contain header "Allow: POST".
        assert.ok(response.headers['allow']);
        assert.strictEqual(response.headers['allow'], 'POST');
      });
    });
  });

  describe('large payload is rejected', () => {
    it('HTTP status code 413 when request is too large', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'POST',
      };

      const req = http.request(options);
      const payload = { long: 'abcdefghij'.repeat(500000) };
      req.write(JSON.stringify(payload));
      req.end();

      req.on('response', (response) => {
        assert.strictEqual(413, response.statusCode);
      });
    });
  });

  describe('malformed JSON is rejected', () => {
    it('HTTP status code 400 when request contains invalid JSON', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'POST',
      };

      const req = http.request(options);
      const payload = '{ "foo": "bar", "baz": ';
      req.write(payload);
      req.end();

      req.on('response', (response) => {
        assert.strictEqual(400, response.statusCode);
      });
    });
  });

  describe('image generation requests', () => {
    const example_data = {
      title: {
        text: "ECharts entry example"
      },
      tooltip: {},
      legend: {
        data: ["Sales"]
      },
      backgroundColor: "#ffffff",
      xAxis: {
        data: ["shirt","cardigan","chiffon shirt","pants","heels","socks"]
      },
      yAxis: {},
      series: [{
        name: "Sales",
        type: "bar",
        data: [5,20,36,10,10,20]
      }]
    };
    const payload = JSON.stringify(example_data);

    it('request with example data is successful', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'POST',
        headers: {
          'X-Image-Format': 'svg'
        }
      };

      const req = http.request(options);
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
          assert.ok(body.indexOf('width="700"') > 0);
          assert.ok(body.indexOf('height="400"') > 0);
          assert.ok(body.indexOf('ECharts entry example') > 0);
          assert.ok(body.indexOf('cardigan') > 0);
          assert.ok(body.indexOf('chiffon shirt') > 0);
          assert.ok(body.indexOf('pants') > 0);
          assert.ok(body.indexOf('heels') > 0);
          assert.ok(body.indexOf('socks') > 0);
        });
      });
    });

    it('request with different image width', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'POST',
        headers: {
          'X-Image-Format': 'svg',
          'X-Image-Width': '751'
        }
      };

      const req = http.request(options);
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
          assert.ok(body.indexOf('width="751"') > 0);
          assert.ok(body.indexOf('height="400"') > 0);
        });
      });
    });

    it('request with different image height', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'POST',
        headers: {
          'X-Image-Format': 'svg',
          'X-Image-Height': '432'
        }
      };

      const req = http.request(options);
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
          assert.ok(body.indexOf('width="700"') > 0);
          assert.ok(body.indexOf('height="432"') > 0);
        });
      });
    });

    it('request with different image width and height', () => {
      const options = {
        port: 3000,
        host: 'localhost',
        method: 'POST',
        headers: {
          'X-Image-Format': 'svg',
          'X-Image-Width': '765',
          'X-Image-Height': '456'
        }
      };

      const req = http.request(options);
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
          assert.ok(body.indexOf('width="765"') > 0);
          assert.ok(body.indexOf('height="456"') > 0);
        });
      });
    });
  });
});
