# Frequently asked questions: troubleshooting

## I am not getting an image file, what went wrong?

In case of any errors, the server will respond with an HTTP status code other
than 200 OK (e.g. 400 Bad Request) and a short plain text message containing the
reason for the error.

## The server responds with "Post data is not valid JSON!", but I have posted only JSON. How can that be?

Note that there are some subtle differences between objects specified directly
in JavaScript and valid JSON. For example, the plot data that could be specified
in a JavaScript code snippet as

    var myChart = echarts.init(document.getElementById('main'));

    // specify chart configuration item and data
    var option = {
        title: {
            text: 'ECharts entry example'
        },
        tooltip: {},
        legend: {
            data:['Sales']
        },
        xAxis: {
            data: ["shirt","cardigan","chiffon shirt","pants","heels","socks"]
        },
        yAxis: {},
        series: [{
            name: 'Sales',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
        }]
    };
    myChart.setOption(option);

corresponds to the following JSON to generate the same chart on the export
server:

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
        "data": [5, 20, 36, 10, 10, 20]
      }]
    }

The notable differences are:

* no single quote string delimiters, only double quotes are valid string
  delimiters in JSON
* names of object members in JSON have to be enclosed in double quotes, too,
  e.g. _name: 'Sales'_ becomes _"name": "Sales"_
