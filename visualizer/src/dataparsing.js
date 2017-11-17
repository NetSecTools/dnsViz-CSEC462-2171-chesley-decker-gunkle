


/*
Calculate frequency of DNS queries per source IP
 */
function generateDonutData() {
    infile = '../input/TestInput1.csv'
    d3.csv(infile, function(csv) {
        var query_count = {};
        var srcIP;
        var row;

        // Count occurences for each IP
        for (var i = 0; i < data.length; i++) {
            row = csv[i]
            srcIP = row[4]
            if (query_count.hasOwnProperty(srcIP)) {
                query_count[srcIP]++;
            }
            else {
                query_count[srcIP] = 1;
            }
        }

        var src_counts = [];
        for (var src in query_count) {
            src_counts.push([src, query_count[src]]);
        }

        src_counts.sort(function(a, b) {
           return a[1] - b[1];
        });

        console.log(src_counts);
        return src_counts;
    });
}
