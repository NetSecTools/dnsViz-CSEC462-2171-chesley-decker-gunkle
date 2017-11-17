


/*
Calculate frequency of DNS queries per source IP
 */
function generateSourceIPData() {
    infile = '../input/TestInput1.csv';
    d3.csv(infile, function(csv) {
        var query_count = {};
        var srcIP;
        var row;

        // Count occurences for each IP
        for (var i = 0; i < csv.length; i++) {
            row = csv[i];
            srcIP = row[4];
            console.log(srcIP); //DEBUG
            if (query_count.hasOwnProperty(srcIP)) {
                query_count[srcIP]++;
            }
            else {
                query_count[srcIP] = 1;
            }
        }
        var outstring; //DEBUG
        var src_counts = [];
        for (var src in query_count) {
            src_counts.push([src, query_count[src]]);
            outstring = 'Src: ' + src + ' Cnt: ' + query_count[src]; //DEBUG
            console.log(outstring) //DEBUG
        }

        src_counts.sort(function(a, b) {
           return a[1] - b[1];
        });

        for (var entry in src_counts) { //DEBUG
            console.log(entry);
        }
        return src_counts;
    });
}



function generateQueryData() {
    infile = '../input/TestInput1.csv';
    d3.csv(infile, function(csv) {
        var query_count = {};
        var query;
        var row;

        // Count occurences for each IP
        for (var i = 0; i < csv.length; i++) {
            row = csv[i];
            srcIP = row[4];
            console.log(srcIP); //DEBUG
            if (query_count.hasOwnProperty(srcIP)) {
                query_count[srcIP]++;
            }
            else {
                query_count[srcIP] = 1;
            }
        }
        var outstring; //DEBUG
        var src_counts = [];
        for (var src in query_count) {
            src_counts.push([src, query_count[src]]);
            outstring = 'Src: ' + src + ' Cnt: ' + query_count[src]; //DEBUG
            console.log(outstring) //DEBUG
        }

        src_counts.sort(function(a, b) {
            return a[1] - b[1];
        });

        for (var entry in src_counts) { //DEBUG
            console.log(entry);
        }
        return src_counts;
    });
}
