


function getStatistics() {
    var input_filepath = '../input/TestInput1.csv';
    var source_frequency = generateSourceIPData(input_filepath);
    var query_freqency = generateQueryData(input_filepath);
}






/*
Calculate frequency of DNS queries per source IP
 */
function generateSourceIPData(infile) {
    d3.text(infile, function(toParse) {
        var data = d3.csvParseRows(toParse);

        var queryCount = {};
        var srcIP;
        var row;
        for (var i = 0; i < data.length; i++) {
            row = data[i];
            srcIP = row[5];
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



function generateQueryData(infile) {
    d3.text(infile, function(toParse) {
        var data = d3.csvParseRows(toParse);

        var queryCount = {};
        var query;
        var row;
        for (i = 0; i < data.length; i++) {
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

        for (var i = 0; i < data.length; i++) { //debug
            console.log(querySorted[i]);
        }
        return querySorted;
    });
}

