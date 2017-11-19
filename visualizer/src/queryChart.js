



function createQueryChart(infile) {
    window.onload = function () {
        var queryData = generateQueryData(infile);
        var dataPoints = [];
        for (var i = 0; i < queryData.length; i++) {
            dataPoints.push({label: queryData[i][0], y: queryData[i][1]});
        }
        var chart = new CanvasJS.Chart("queryChartContainer", {
            animationEnabled: true,

            title: {
                text: "Top 10 queries by frequency"
            },
            axisX: {
                interval: 1
            },
            axisY2: {
                interlacedColor: "rgba(1,77,101,.2)",
                gridColor: "rgba(1,77,101,.1)",
                title: "Frequency of query"
            },
            data: [{
                type: "bar",
                name: "queries",
                axisYType: "secondary",
                color: "#014D65",
                dataPoints: dataPoints
            }]
        });
        chart.render();

    }
}