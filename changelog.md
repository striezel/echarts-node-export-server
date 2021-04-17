# Version history of Node.js server for offline export of ECharts graphs

_(Note: This changelog focuses on the major changes between the different
versions. Therefore, it may not contain all changes. Especially smaller fixes or
improvements may be omitted.)_

As a general rule the version tries to follow the
[Semantic Versioning](https://semver.org/) scheme.
Since [ECharts](https://echarts.apache.org/) is the main dependency of this
application, major version changes in ECharts will also trigger a major version
change in this application.

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
