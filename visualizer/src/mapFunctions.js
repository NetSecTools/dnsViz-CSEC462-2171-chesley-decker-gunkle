
function getColor(category){
    if (category === 'Pass'){
        return "#00c153";
    }
    else if (category === 'DNS Server'){
        return "#42e5f4";
    }
    else{
        return "#c10a00";
    }
}


/*
Return corresponding color for record type
 */
function getRecordColor(record){
    return record === "A" ? "#42e5f4" :
        record === "AAAA" ? "#1662f4" :
            record === "ANY" ? "#2bf465" :
                record === "CNAME" ? "#d4f427" :
                    record === "MX" ? "#e6beff" :
                        record === "NS" ? "#911eb9" :
                            record === "PTR" ? "#f4ac4e" :
                                record === "SIG" ? "#198822" :
                                    record === "SOA" ? "#aaffc3" :
                                        record === "SRV" ? "#FFFFFF" :
                                            record === "TXT" ? "#f58231" :
                                                "#42e5f4"
}

function addLegend(Map){
    var legend = L.control({position: 'bottomright'});
    legend.onAdd = function (Map) {
        var div = L.DomUtil.create('div', 'info legend');
        var categories = ['Pass', 'Fail', 'DNS Server'];
        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
                '<i class="circle" style="background:' + getColor(categories[i]) + '"></i> ' +
                (categories[i] ? categories[i] + '<br>' : '+');
        }
        return div;
    };
    legend.addTo(Map);
}

function displayTitle(Map, titleText){
    var title = L.control({position: 'topleft'});
    title.onAdd = function (Map) {
        var div = L.DomUtil.create('div', 'map title');
        div.innerHTML +=
            ('<i style="background:' + '#9d9d9d' + '"></i> ' + titleText);
        return div;
    };
    title.addTo(Map);
}


/*
Display markers, legends, and title on map
 */
function displayMapFeatures(Map, data, DNSServerCoords, queryMarkers, queryLines){

    var row;
    var queryCoords;
    var query;
    var country;
    var source;
    var validation;
    var validationColor;    // Red if DNSsec failed for query, green otherwise
    var recordType;
    for (var i = 0; i < data.length; i++){
        row = data[i];
        source = row[4];
        query = row[5];
        country = row[11];
        validation = row[15];
        recordType = row[6];

        validationColor = getRecordColor(recordType);
        if (validation === "fail"){        // Check if requested DNSSec was invalid
            validationColor = "#c10a00";
        }
        var queryMarkerOptions = {
            radius: 7,
            fillColor: validationColor,
            color: 'black',
            weight: 1,
            opacity: .5,
            fillOpacity: 0.5
        };

        var failedQueryMarkerOptions = {
            radius: 9,
            fillColor: validationColor,
            color: 'black',
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        };

        queryCoords = L.latLng(row[13], row[14]);

        var toolTip = '' +
            "Source: " + source + "<br>" +
            "Query: " + query + "<br>" +
            "Country: " + country + "<br>" +
            "Record:" + recordType + "<br>" +
            "DNSSEC" + validation + "<br>" +
            queryCoords + "<br>";

        // add new circle marker for query to queryMarkers list
        if (validation === "pass") {
            queryMarkers.push(new L.circleMarker(queryCoords, queryMarkerOptions)
                .bindTooltip(toolTip)
                .addTo(Map));
        }
        else{
            var failedMarker = new L.circleMarker(queryCoords, failedQueryMarkerOptions)
                .bindTooltip(toolTip)
                .addTo(Map)
                .bringToFront();
            queryMarkers.push(failedMarker);

        }
        var pointA = queryCoords;
        var pointB = DNSServerCoords;
        var pointList = [pointA, pointB];

        validationColor = getRecordColor(recordType);
        if (validation === "fail"){    // check if requested DNSSec was invalid
            validationColor = "#c10a00";
        }

        //  Add new polyline linking source and DNS server
        queryLines.push(new L.polyline(pointList, {
            color: validationColor,
            weight: 3,
            opacity: 0.5,
            smoothFactor: 1
        }).addTo(Map));
    }

    addLegend(Map);
    displayTitle(Map, "DNS Map");

}