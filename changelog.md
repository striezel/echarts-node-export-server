# Version history of Node.js server for offline export of ECharts graphs

_(Note: This changelog focuses on the major changes between the different
versions. Therefore, it may not contain all changes. Especially smaller fixes or
improvements may be omitted.)_

As a general rule the version tries to follow the
[Semantic Versioning](https://semver.org/) scheme.
Since [ECharts](https://echarts.apache.org/) is the main dependency of this
application, major version changes in ECharts will also trigger a major version
change in this application.

## Version 3.0.0-pre (2022-06-??)

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
background. To set a background color, use the
[backgroundColor](https://echarts.apache.org/en/option.html#backgroundColor)
of ECharts. For example, to get the white background as in previous versions,
add `"backgroundColor": "#ffffff"` to the chart options.

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
This fixes a prototype pollution vulnerabilty in the `minimist` package,
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
