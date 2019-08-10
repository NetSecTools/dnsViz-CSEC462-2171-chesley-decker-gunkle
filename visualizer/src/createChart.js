


function addChart(data, chartDivs, body, chartcount){
    var chartName = 'chart' + chartcount;
    chartcount++;
    var buttonDiv = body.selectAll('button')
        .append('div');
    buttonDiv.append('button')
        .attr('text', 'Query frequency')
        .attr('onClick', 'createQueryChart(data)');
    var chartDiv = body.selectAll('div')
        .append('div')
        .attr('class', 'chart');
}


/*
Create canvas chart sorting by frequency of
specified attribute
data: lines to parse
field: row of CSV for frequency calculation
*/
function createCustomFreqChart(data, sortField) {

    var fieldCount = {};
    var field;
    var row;
    for (var i = 0; i < data.length; i++){     // Count frequency of each field
        row = data[i];
        field = row[5];
        if (fieldCount.hasOwnProperty(field)){
            fieldCount[field]++;
        }
        else {
            fieldCount[field] = 1;
        }
    }

    var fieldSorted = [];
    for (var q in fieldCount){
        fieldSorted.push([q, fieldCount[q]]);
    }

    fieldSorted.sort(function(a, b){       // sort by frequency, descending
        return b[1] - a[1];
    });


    var fieldData = fieldSorted;
    var fieldDataPoints = [];
    for (i = 0; i < fieldData.length; i++){
        fieldDataPoints.push({label: fieldData[i][0], y: fieldData[i][1]});

    }
    var fieldChart = new CanvasJS.Chart("fieldChartContainer", {        // create chart
        animationEnabled: true,

        title: {
            text: "Queries by frequency of field"
        },
        data: [{
            type: "column", //change type to bar, line, area, pie, etc
            indexLabel: "{y}", //Shows y value on all Data Points
            indexLabelFontColor: "#5A5757",
            indexLabelPlacement: "outside",
            dataPoints: fieldDataPoints
        }]
    });
    fieldChart.render();
}

/*
Create Canvas chart showing each query by frequency
 */
function createQueryChart(data){
    var queryCount = {};
    var query;
    var row;
    for (var i = 0; i < data.length; i++){     // Count frequency of each query
        query = data[i]['query'];
        if (queryCount.hasOwnProperty(query)){
            queryCount[query]++;
        }
        else {
            queryCount[query] = 1;
        }
    }

    var querySorted = [];
    for (var q in queryCount){
        querySorted.push([q, queryCount[q]]);
    }

    querySorted.sort(function(a, b){       // sort by frequency, descending
        return b[1] - a[1];
    });


    var queryData = querySorted;
    var queryDataPoints = [];
    for (i = 0; i < queryData.length; i++){
        queryDataPoints.push({label: queryData[i][0], y: queryData[i][1]});

    }
    var queryChart = new CanvasJS.Chart("queryFrequency", {        // create chart
        animationEnabled: true,

        title: {
            text: "Queries by frequency of query"
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
}



/*
Create Canvas chart showing each source IP by frequency
 */
function createSourceChart(data){
    var queryCount = {};
    var srcIP;
    var srcAndPort;
    var row;
    for (var i = 0; i < data.length; i++){     // count frequency of each IP
        srcAndPort = data[i]['source'];
        srcAndPort = srcAndPort.split("#");
        srcIP = srcAndPort[0];
        if (queryCount.hasOwnProperty(srcIP)){
            queryCount[srcIP]++;
        }
        else {
            queryCount[srcIP] = 1;
        }
    }
    var querySorted = [];
    for (var q in queryCount){
        querySorted.push([q, queryCount[q]]);
    }

    querySorted.sort(function(a, b){
        return b[1] - a[1];
    });


    var queryData = querySorted;
    var sourceDataPoints = [];
    for (i = 0; i < queryData.length; i++){
        sourceDataPoints.push({label: queryData[i][0], y: queryData[i][1]});
        //console.log(queryData[i]);
    }
    var sourceChart = new CanvasJS.Chart("sourceFrequency", {
        animationEnabled: true,

        title: {
            text: "Sources by frequency of request"
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
}