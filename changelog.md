# Version history of Node.js server for offline export of ECharts graphs

_(Note: This changelog focuses on the major changes between the different
versions. Therefore, it may not contain all changes. Especially smaller fixes or
improvements may be omitted.)_

As a general rule the version tries to follow the
[Semantic Versioning](https://semver.org/) scheme.
Since [ECharts](https://echarts.apache.org/) is the main dependency of this
application, major version changes in ECharts will also trigger a major version
change in this application.

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
