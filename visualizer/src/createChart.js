



function createQueryChart(sourceFile) {
    d3.text(sourceFile, function(content) {

        var data = d3.csvParseRows(content);

        var queryCount = {};
        var query;
        var row;
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            query = row[5];
            if (queryCount.hasOwnProperty(query)) {
                queryCount[query]++;
            }
            else {
                queryCount[query] = 1;
            }
        }

        var querySorted = [];
        for (var q in queryCount) {
            querySorted.push([q, queryCount[q]]);
        }

        querySorted.sort(function(a, b) {
            return b[1] - a[1];
        });


        var queryData = querySorted;
        var queryDataPoints = [];
        for (i = 0; i < queryData.length; i++) {
            queryDataPoints.push({label: queryData[i][0], y: queryData[i][1]});

        }
        var queryChart = new CanvasJS.Chart("queryChartContainer", {
            animationEnabled: true,

            title: {
                text: "Top 10 queries by frequency of query"
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: queryDataPoints
            }]
        });
        queryChart.render();
    });
}




function createSourceChart(sourceFile) {
    d3.text(sourceFile, function(content) {
        var data = d3.csvParseRows(content);

        var queryCount = {};
        var srcIP;
        var srcAndPort;
        var row;
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            srcAndPort = row[4];
            srcAndPort = srcAndPort.split("#");
            srcIP = srcAndPort[0];
            if (queryCount.hasOwnProperty(srcIP)) {
                queryCount[srcIP]++;
            }
            else {
                queryCount[srcIP] = 1;
            }
        }
        var querySorted = [];
        for (var q in queryCount) {
            querySorted.push([q, queryCount[q]]);
        }

        querySorted.sort(function(a, b) {
            return b[1] - a[1];
        });


        var queryData = querySorted;
        var sourceDataPoints = [];
        for (i = 0; i < queryData.length; i++) {
            sourceDataPoints.push({label: queryData[i][0], y: queryData[i][1]});
            //console.log(queryData[i]);
        }
        var sourceChart = new CanvasJS.Chart("sourceChartContainer", {
            animationEnabled: true,

            title: {
                text: "Top 10 sources by frequency of request"
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: sourceDataPoints
            }]
        });
        sourceChart.render();
    });
}