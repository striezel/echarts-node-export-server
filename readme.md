# Node.js server for offline export of ECharts graphs

This repository contains a Node.js application that starts a server which can
render ECharts graphs to PNG images.

## Requirements

This application needs two prerequisites:

* Node.js (preferably the latest LTS version)
* PhantomJS (installed via NPM)

### Installation of Node.js

The installation of Node.js is covered in a [separate document](./documentation/installation-node-js.md).

_(If you prefer a setup within a Docker container over a native installation,
then please take a look at [Setup with Docker](./documentation/docker.md).)_

## Initial setup: install Node.js dependency packages

The application requires a package for PhantomJS. To install that, type

    npm install

in the directory `export-server/`. You only need to do this once. The packages
are then cached in the `node_modules/` directory for future use.

However, PhantomJS does not offer a prebuilt package for some platforms, namely
ARM which is used by Raspberry Pi (among others). In such case you can install
the PhantomJS package provided by your package manager via

    apt-get install phantomjs

on Raspbian, or via

    yum install phantomjs

on RedHat-based distributions.

## Start the application

You can simply start the application via

    npm start

which fires up the Node.js application. The server will then listen on
<http://localhost:3000/> for incoming connections.

## Usage

To generate a PNG file of an ECharts plot, just send an HTTP POST request to the
running Node.js server on <http://localhost:3000/> containing the data for the
plot as JSON in its body.

For example, POSTing the following JSON code to the server

    {
      "title": {
        "text": "ECharts entry example"
      },
      "tooltip": {},
      "legend": {
        "data": ["Sales"]
      },
      "xAxis": {
        "data": ["shirt","cardigan","chiffon shirt","pants","heels","socks"]
      },
      "yAxis": {},
      "series": [{
        "name": "Sales",
        "type": "bar",
        "data": [5,20,36,10,10,20]
      }]
    }

will generate a JSON response like e.g.:

    {
      "success": true,
      "filename": "graph-4a8d8e1d-eef8-4593-bd4c-422866243121.png"
    }

The field _filename_ in the response indicates the location of the generated
image file on the server. In the example above you could then get the image from
<http://localhost:3000/graph-4a8d8e1d-eef8-4593-bd4c-422866243121.png>. Given
the data above the image would look like this:

![Generated image example](./documentation/graph-4a8d8e1d-eef8-4593-bd4c-422866243121.png)

### Adjusting the width and height of the generated image

The generated PNG image has a width of 700 pixels and a height of 400 pixels by
default. If no size is specified, then the image will be of that default size.
However, this may not always be suitable for your needs.

There are two ways to change the image size:

* adding certain HTTP headers to the request _(preferred way)_, or
* adding two data members to the POST-ed JSON data.

If both are present, then the HTTP headers take precedence.

#### Changing the size via HTTP headers

To change the size, add the HTTP headers `X-Image-Width` and / or
`X-Image-Height` to the request. Acceptable values are integers only, the values
will be interpreted as pixels, not centimetres, inches or other. For example, if
you want the image to be 750 x 500 pixels, then set the HTTP headers

    X-Image-Width: 750
    X-Image-Height: 500

Using the same JSON as above, the created image will now be slightly larger and
look like this:

![Custom size image example](./documentation/graph-2eae6ee3-cb0c-464d-8997-7c2476e8d69d.png)

#### Changing the size via JSON

If sending HTTP headers with your request is too cumbersome and you do not mind
"polluting" the ECharts JSON with a bit of extra data, then that can be used to
adjust the image size, too. Just add the members `imageWidth` and / or
`imageHeight` to the top-level object. As with the HTTP headers, the values will
be interpreted as pixels, not centimetres or inches.

For example, POSTing the following JSON code to the server

    {
      "imageWidth": 750,
      "imageHeight": 500,
      "title": {
        "text": "ECharts entry example"
      },
      "tooltip": {},
      "legend": {
        "data": ["Sales"]
      },
      "xAxis": {
        "data": ["shirt","cardigan","chiffon shirt","pants","heels","socks"]
      },
      "yAxis": {},
      "series": [{
        "name": "Sales",
        "type": "bar",
        "data": [5,20,36,10,10,20]
      }]
    }

will generate the same image with dimensions of 750 x 500 pixels.

## Troubleshooting

If you encounter problems while trying to generate a chart image, then please
take a look at [the FAQ](./documentation/troubleshooting-faq.md). Some common
errors and possible solutions are listed there.

## Copyright and Licensing

Copyright 2018, 2020, 2021  Dirk Stolle

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
