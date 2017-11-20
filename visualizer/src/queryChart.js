



function createQueryChart(sourceFile) {

        var queryData = generateQueryData(sourceFile);
        console.log(queryData);
        var dataPoints = [];
        for (var i = 0; i < queryData.length; i++) {
            dataPoints.push({label: queryData[i][0], y: queryData[i][1]});
            console.log(queryData[i]);
        }
        var chart = new CanvasJS.Chart("queryChartContainer", {
            animationEnabled: true,

            title: {
                text: "Top 10 queries by frequency"
            },
            data: [{
                type: "column", //change type to bar, line, area, pie, etc
                indexLabel: "{y}", //Shows y value on all Data Points
                indexLabelFontColor: "#5A5757",
                indexLabelPlacement: "outside",
                dataPoints: dataPoints
            }]
        });
        chart.render();


}