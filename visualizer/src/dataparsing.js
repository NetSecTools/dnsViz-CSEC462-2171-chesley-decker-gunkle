


/* Get frequency of source IPs
Parameters: filename of csv to process
Return: Sorted array of source and frequency pairs
 */
function generateSourceIPData(infile) {
    return d3.text(infile, function(toParse) {
        var data = d3.csvParseRows(toParse);

        var queryCount = {};
        var srcIP;
        var srcAndPort;
        var row;
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            srcAndPort = row[5];
            srcAndPort = srcAndPort.split("#");
            console.log(srcAndPort[0]);
            console.log(srcAndPort[1]);

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

        return querySorted;
    });
}


/* Get frequency of queries
Parameters: filename of csv to process
Return: Sorted array of query and frequency pairs
 */
function generateQueryData(infile) {
    var sortedList = [];
    d3.text(infile, function(toParse) {

        var data = d3.csvParseRows(infile);

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

        sortedList = querySorted;
    });
    return sortedList;
}

