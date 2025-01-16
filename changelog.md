# Version history of Node.js server for offline export of ECharts graphs

_(Note: This changelog focuses on the major changes between the different
versions. Therefore, it may not contain all changes. Especially smaller fixes or
improvements may be omitted.)_

As a general rule the version tries to follow the
[Semantic Versioning](https://semver.org/) scheme.
Since [ECharts](https://echarts.apache.org/) is the main dependency of this
application, major version changes in ECharts will also trigger a major version
change in this application.

## Version 7.0.2 (2025-01-16)

* __[maintenance]__
Update dependency `node-abi` to 3.73.0.

## Version 7.0.1 (2025-01-15)

* __[maintenance]__
Update dependency `node-abi` to 3.72.0.

* __[maintenance]__
Update dependency `tar-fs` to 2.1.2.

## Version 7.0.0 (2025-01-08)

* __[breaking change]__
__Support for Node.js 16, and Node.js 17 is dropped.__
The minimum required version is now Node.js 18.
These old Node.js versions have reached their end of life. All those versions
are not maintained anymore by the Node.js developers. If you are still using
older versions of Node.js, then please consider updating to a newer one.

* __[maintenance]__
Update dependency `canvas` to 3.0.1.
This version of `canvas` drops support for Node.js 16.

* __[maintenance]__
The lock file package-lock.json is converted from version 2 to version 3.
Version 3 has been supported since (at least) Node.js 16 and is the default in
Node.js 18. Since this project already requires Node.js 18 or later it is save
to convert the file to the newer version.

* __[maintenance]__
Update Dockerfile to use Node.js 22 instead of Node.js 20.

## Version 6.1.0 (2025-01-01)

* __[improvement]__
The image rendering process is simplified and does now use less I/O operations.

* __[improvement]__
  The ECharts library is updated from version 5.5.1 to version 5.6.0.
  ECharts 5.6.0 brings several fixes and a new features, compared to 5.5.1.
  For a full list of those see the release notes of ECharts:

  [Changes in ECharts 5.6.0](https://github.com/apache/echarts/releases/tag/5.6.0)

* __[maintenance]__
Update dependency `debug` to 4.4.0.

## Version 6.0.6 (2024-11-11)

* __[maintenance]__
Update dependency `uuid` to 11.0.3.

## Version 6.0.5 (2024-10-29)

* __[maintenance]__
Update dependency `uuid` to 11.0.2.

## Version 6.0.4 (2024-10-28)

* __[maintenance]__
Update Dockerfile to use Node.js 20 instead of Node.js 16.
Furthermore, the base image is updated from Debian 11 to Debian 12.

* __[maintenance]__
Update dependency `uuid` to 11.0.1.

## Version 6.0.3 (2024-10-13)

* __[maintenance]__
Update dependency `nan` to 2.22.0.

## Version 6.0.2 (2024-09-16)

* __[maintenance]__
Update dependency `debug` to 4.3.7.

* __[maintenance]__
Update dependency `ms` to 2.1.3.

## Version 6.0.1 (2024-07-29)

* __[maintenance]__
Update dependency `debug` to 4.3.6.

* __[maintenance]__
Update dependency `semver` to 7.6.3.

## Version 6.0.0 (2024-06-30)

* __[breaking change]__
__Support for Node.js 12, Node.js 13, Node.js 14, and Node.js 15 is dropped.__
The minimum required version is now Node.js 16.
These old Node.js versions have reached their end of life. All those versions
are not maintained anymore by the Node.js developers. If you are still using
older versions of Node.js, then please consider updating to a newer one.

* __[breaking change]__
Update dependency `uuid` to 10.0.0. This version of `uuid` drops support for
Node.js 14 (and earlier versions).

## Version 5.1.6 (2024-06-28)

* __[improvement]__
  The ECharts library is updated from version 5.5.0 to version 5.5.1.
  ECharts 5.5.1 brings several fixes and a few new features, compared to 5.5.0.
  For a full list of those see the release notes of ECharts:

  [Changes in ECharts 5.5.1](https://github.com/apache/echarts/releases/tag/5.5.1)

## Version 5.1.5 (2024-06-22)

* __[maintenance]__
Update dependency `nan` to 2.20.0.

## Version 5.1.4 (2024-05-31)

* __[maintenance]__
Update dependency `debug` to 4.3.5.

## Version 5.1.3 (2024-05-28)

* __[maintenance]__
Update dependency `semver` to 7.6.2.

* __[maintenance]__
Update Dockerfile to use Node.js 16 instead of Node.js 14.

## Version 5.1.2 (2024-03-31)

* __[maintenance]__
Update dependency `detect-libc` to 2.0.3.

* __[maintenance]__
Update dependency `tar` to 6.2.1.

## Version 5.1.1 (2024-03-16)

* __[maintenance]__
Update dependency `nan` to 2.19.0.

## Version 5.1.0 (2024-02-20)

* __[improvement]__
  The ECharts library is updated from version 5.4.3 to version 5.5.0.
  ECharts 5.5.0 brings several fixes and a new features, compared to 5.4.3.
  For a full list of those see the release notes of ECharts:

  [Changes in ECharts 5.5.0](https://github.com/apache/echarts/releases/tag/5.5.0)

## Version 5.0.13 (2024-02-10)

* __[maintenance]__
Update dependency `semver` to 7.6.0.

## Version 5.0.12 (2023-11-30)

* __[improvement]__
Whenever the server responds to an unallowed method with HTTP status code 405,
it will now also send an `Allow` HTTP header to indicate the allowed methods.
This behaviour is required by [RFC 9110](https://httpwg.org/specs/rfc9110.html#status.405),
so it should be implemented.

Furthermore, any HTTP request to the server root using the OPTIONS method will
now return the allowed options via an `Allow` HTTP header.

## Version 5.0.11 (2023-11-29)

* __[bug fix]__
Fix error in handling of unusually large payloads.

## Version 5.0.10 (2023-09-15)

* __[maintenance]__
Update dependency `nan` to 2.18.0.

* __[maintenance]__
Update dependency `tar` to 6.2.0.

* __[maintenance]__
Update dependency `uuid` to 9.0.1.

## Version 5.0.9 (2023-09-01)

* __[maintenance]__
Update dependency `node-fetch` to 2.7.0.

## Version 5.0.8 (2023-07-20)

* __[improvement]__
  The ECharts library is updated from version 5.4.2 to version 5.4.3.
  ECharts 5.4.3 brings several fixes and a few new features, compared to 5.4.2.
  For a full list of those see the release notes of ECharts:

  [Changes in ECharts 5.4.3](https://github.com/apache/echarts/releases/tag/5.4.3)

* __[maintenance]__
Update dependency `detect-libc` to 2.0.2.

## Version 5.0.7 (2023-07-16)

* __[maintenance]__
Update dependency `@mapbox/node-pre-gyp` to 10.0.11.

## Version 5.0.6 (2023-07-13)

* __[maintenance]__
Update dependency `semver` v6 to 6.3.1.

## Version 5.0.5 (2023-07-10)

* __[maintenance]__
Update dependency `semver` to 7.5.4.

## Version 5.0.4 (2023-07-01)

* __[maintenance]__
Update dependency `node-fetch` to 2.6.12.

## Version 5.0.3 (2023-06-28)

* __[maintenance]__
Update dependency `semver` to 7.5.3. This fixes a Regular Expression Denial of
Service vulnerability in `semver` (CVE-2022-25883).

## Version 5.0.2 (2023-05-17)

* __[maintenance]__
Update dependency `tar` to 6.1.15.

## Version 5.0.1 (2023-05-13)

* __[maintenance]__
Update dependency `node-fetch` to 2.6.11.

* __[maintenance]__
Update dependency `semver` to 7.5.1.

## Version 5.0.0 (2023-05-09)

* __[breaking change]__
Generated image files are now served directly in the response to the request
instead of just providing a JSON response that contains the file name of the
generated image. That is, instead of returning a JSON response like
```json
{
  "success": true,
  "filename": "graph-4a8d8e1d-eef8-4593-bd4c-422866243121.png"
}
```
the image is returned directly in the HTTP response message body.

This approach has several advantages:
* Users only need to make one request to the server instead of two to get the
  generated image.
* The server does not get filled with generated images files as in previous
  versions, because the images do not need to be stored for later retrieval
  anymore.

## Version 4.1.18 (2023-05-09)

* __[maintenance]__
Update dependency `node-fetch` to 2.6.10.

## Version 4.1.17 (2023-05-07)

* __[maintenance]__
Update dependency `tar` to 6.1.14.

* __[maintenance]__
Update dependency `minipass` to 5.0.0.

## Version 4.1.16 (2023-04-17)

* __[maintenance]__
Update dependency `semver` to 7.5.0.

## Version 4.1.15 (2023-04-12)

* __[maintenance]__
Update dependency `minipass` to 4.2.8.

* __[maintenance]__
Update dependency `semver` to 7.4.0.

## Version 4.1.14 (2023-04-09)

* __[maintenance]__
Update dependency `minipass` to 4.2.6.

## Version 4.1.13 (2023-04-04)

* __[maintenance]__
Update dependency `canvas` to 2.11.2.

## Version 4.1.12 (2023-03-25)

* __[improvement]__
  The ECharts library is updated from version 5.4.1 to version 5.4.2.
  ECharts 5.4.2 brings several fixes and a few new features, compared to 5.4.1.
  For a full list of those see the release notes of ECharts:

  [Changes in ECharts 5.4.2](https://github.com/apache/echarts/releases/tag/5.4.2)

## Version 4.1.11 (2023-03-12)

* __[maintenance]__
Update dependency `minipass` to 4.2.5.

* __[maintenance]__
Update dependency `readable-stream` to 3.6.2.

## Version 4.1.10 (2023-03-02)

* __[maintenance]__
Update dependency `minipass` to 4.2.4.

## Version 4.1.9 (2023-02-26)

* __[maintenance]__
Update dependency `minipass` to 4.2.1.

* __[maintenance]__
Update dependency `readable-stream` to 3.6.1.

## Version 4.1.8 (2023-02-09)

* __[maintenance]__
Update dependency `minipass` to 4.0.3.

## Version 4.1.7 (2023-02-01)

* __[maintenance]__
Update dependency `minipass` to 4.0.1.

* __[maintenance]__
Update dependency `node-fetch` to 2.6.9.

## Version 4.1.6 (2023-01-13)

* __[maintenance]__
Update dependency `node-fetch` to 2.6.8.

## Version 4.1.5 (2022-12-24)

* __[maintenance]__
Update dependency `canvas` to 2.11.0.

## Version 4.1.4 (2022-12-09)

* __[improvement]__
  The ECharts library is updated from version 5.4.0 to version 5.4.1.
  ECharts 5.4.1 brings several fixes and a few new features, compared to 5.4.0.
  For a full list of those see the release notes of ECharts:

  [Changes in ECharts 5.4.1](https://github.com/apache/echarts/releases/tag/5.4.1)

* __[maintenance]__
  Update dependency `tar` to 6.1.13.

## Version 4.1.3 (2022-11-29)

* __[maintenance]__
Update dependency `minipass` to 3.3.6.

## Version 4.1.2 (2022-11-06)

* __[maintenance]__
Update dependency `tar` to 6.1.12.

## Version 4.1.1 (2022-10-31)

* __[maintenance]__
Update dependency `canvas` to 2.10.2.

Note: `canvas` 2.10.2 is the first version which has prebuilds for Node.js 16
and Node.js 18, so the initial npm install should now work smoother for people
using those versions of Node.js.

## Version 4.1.0 (2022-10-16)

__[improvement]__
The ECharts library is updated from version 5.3.3 to version 5.4.0.
ECharts 5.4.0 brings several fixes and a few new features, compared to 5.3.3.
For a full list of those see the release notes of ECharts:

* [Changes in ECharts 5.4.0](https://github.com/apache/echarts/releases/tag/5.4.0)

## Version 4.0.1 (2022-10-16)

* __[maintenance]__
Update dependencies `nan` to 2.17.0, and `semver` to 7.3.8.

## Version 4.0.0 (2022-09-21)

* __[breaking change]__
__Support for Node.js 8, Node.js 9, Node.js 10, and Node.js 11 is dropped.__
The minimum required version is now Node.js 12.
Node.js 8 has reached its end of life on 2019-12-31, Node.js 9 reached its end
of life on 2018-06-30, Node.js 10 reached its end of life on 2021-04-30, Node.js
11 reached its end of life on 2019-06-01. All those versions are not maintained
anymore by the Node.js developers. If you are still using older versions of
Node.js, then please consider updating to a newer one.
* __[breaking change]__
Update dependency `uuid` to 9.0.0. This version of `uuid` drops support for
Node.js 10 (and earlier).

## Version 3.0.4 (2022-09-12)

* __[maintenance]__
Update dependencies `canvas` to 2.10.1, and `@mapbox/node-pre-gyp` to 1.0.10.

## Version 3.0.3 (2022-07-03)

* __[maintenance]__
Update dependencies `canvas` to 2.9.3, and `minipass` to 3.3.4.

## Version 3.0.2 (2022-07-03)

__[improvement]__
The requirement for Node.js 8 or a later version is now explicitly stated in the
`package.json` file. While Node.js 8 or later has been required since version
3.0.0, this step provides clarity on the required version of Node.js.

## Version 3.0.1 (2022-06-18)

__[improvement]__
The ECharts library is updated from version 5.3.2 to version 5.3.3.
ECharts 5.3.3 brings several fixes and a few new features, compared to 5.3.2.
For a full list of those see the release notes of ECharts:

* [Changes in ECharts 5.3.3](https://github.com/apache/echarts/releases/tag/5.3.3)

## Version 3.0.0 (2022-06-07)

__[improvement]__
Rendering is switched from PhantomJS to server-side rendering of ECharts,
available since ECharts 5.3.0. This should be faster than the previous approach
with PhantomJS.

__[new feature]__
Furthermore, it is now possible to get the plots rendered as SVG images. To
switch to SVG, add the  HTTP header `X-Image-Format` to the request and set its
value to `svg` (all lower case).

__[breaking change]__
PNG images will now use a transparent background instead of the previous white
background. To set a background color, use the option
[backgroundColor](https://echarts.apache.org/en/option.html#backgroundColor)
of ECharts. For example, to get the white background as in previous versions,
add `"backgroundColor": "#ffffff"` to the chart options.

Furthermore, the application will now __require at least version 8 of Node.js,__
but the use of a later version that is still maintained (e. g. Node.js 14 LTS)
is preferred.

__[maintenance]__
Update dependency `uuid` to 8.3.2.

## Version 2.2.0 (2022-05-24)

__[improvement]__
The ECharts library is updated from version 5.0.2 to version 5.3.2.
ECharts 5.3.2 brings several fixes and new features, compared to 5.0.2. For a
full list of those see the release notes of ECharts:

* [Changes in ECharts 5.3.2](https://github.com/apache/echarts/releases/tag/5.3.2)
* [Changes in ECharts 5.3.1](https://github.com/apache/echarts/releases/tag/5.3.1)
* [Changes in ECharts 5.3.0](https://github.com/apache/echarts/releases/tag/5.3.0)
* [Changes in ECharts 5.2.2](https://github.com/apache/echarts/releases/tag/5.2.2)
* [Changes in ECharts 5.2.1](https://github.com/apache/echarts/releases/tag/5.2.1)
* [Changes in ECharts 5.2.0](https://github.com/apache/echarts/releases/tag/5.2.0)
* [Changes in ECharts 5.1.2](https://github.com/apache/echarts/releases/tag/5.1.2)
* [Changes in ECharts 5.1.1](https://github.com/apache/echarts/releases/tag/5.1.1)
* [Changes in ECharts 5.1.0](https://github.com/apache/echarts/releases/tag/5.1.0)

## Version 2.1.5 (2022-04-12)

* __[maintenance]__
Update dependencies `graceful-fs` to 4.2.10, `mime-db` to 1.52.0, `mime-type` to
2.1.35, and `mkdirp` to 0.5.6.

## Version 2.1.4 (2022-03-30)

* __[maintenance]__
Update dependency `minimist` to 1.26.0.
This fixes a prototype pollution vulnerability in the `minimist` package,
[CVE-2021-44906](https://nvd.nist.gov/vuln/detail/CVE-2021-44906).

## Version 2.1.3 (2022-01-22)

* __[maintenance]__
Update dependencies `graceful-fs` to 4.2.9, `qs` to 6.5.4, and `sshpk` to
1.17.0.

## Version 2.1.2 (2021-12-10)

* __[maintenance]__
Update dependencies `asn1` to 0.2.6, `json-schema` to 0.4.0, `jsprim` to 1.4.2,
`mime-db` to 1.51.0, and `mime-types` to 2.1.34.

## Version 2.1.1 (2021-10-09)

* __[maintenance]__
Update dependencies `core-util-is` to 1.0.3, `graceful-fs` to 4.2.8, `mime-db`
to 1.50.0, `mime-types` to 2.1.33.

## Version 2.1.0 (2021-08-01)

* __[new feature]__
The port to which the server binds can now be changed by setting the environment
variable `PORT`. If `PORT` is not set or is not a valid port number, then the
default port 3000 is used.

* __[new feature]__
The hostname which the server shall use can now be changed by setting the
environment variable `HOST`. If `HOST` is not set, then `localhost` will be
used as default.

## Version 2.0.2 (2021-08-01)

* __[maintenance]__
Update dependencies `buffer-from` to 1.1.2, `mime-db` to 1.49.0 and `mime-types`
to 2.1.32.

## Version 2.0.1 (2021-07-18)

* __[maintenance]__
The package dependencies `mime-db` and `mime-types` are updated to 1.48.0 and
2.1.31, respectively.

## Version 2.0.0 (2021-04-20)

* __[breaking change]__
The ECharts library is updated from version 4.9.0 to version 5.0.2. Note that
ECharts 5.0.0 introduced some __breaking changes__ like using a different
default colour scheme or removing the built-in map GeoJSON. A complete list of
the changes can be found at
<https://github.com/apache/echarts/releases/tag/5.0.0>. Review this list
carefully before using the new version.

* __[breaking change]__
The default image width is increased from 600 pixels to 700 pixels.
Note that you can always specify your desired image width and height via the
image size feature that was introduced in version 1.1.0.

## Version 1.2.0 (2021-04-17)

__[improvement]__
The generated names for PNG files are using UUIDs (version 4) instead of a
Unix timestamp in their name. That is, the JSON output of a successful render
will change from something like

    {
      "success": true,
      "filename": "graph-1520685763528.png"
    }

to something like

    {
      "success": true,
      "filename": "graph-f254cb3f-d6e3-4eb4-a74b-50586f4208e1.png"
    }

instead. While it is highly unlikely that rendering of a plot with ECharts and
JavaScript is so fast that two PNG files are created within the same millisecond
this change makes sure we are on the safe side here.

Also note that the application never gave any guarantees for the naming pattern
of the generated files in the first place. Therefore, anyone consuming the JSON
response should treat the `filename` value as a purely random file name.

## Version 1.1.0 (2021-04-17)

__[feature]__
The dimensions of the generated image can now be adjusted by either adding the
HTTP headers `X-Image-Width` and / or `X-Image-Height` to the request, or by
adding the members `imageWidth` and / or `imageHeight` to the POST-ed JSON data.
If both are present and contain acceptable values, then the headers take
precedence. If none of them are specified, the size remains at 600 x 400 pixels
as in version 1.0.0.

See the readme for examples of the new feature.

## Version 1.0.0

This is the initial release.
