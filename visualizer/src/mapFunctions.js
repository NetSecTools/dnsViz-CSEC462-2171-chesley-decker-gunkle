



function createMap(data, DNSServerLat, DNSServerLong){
    var queryMarkers = [];
    var queryLines = [];
    // latLng object with DNS server coordinates
    var DNSServerCoords = L.latLng(DNSServerLat, DNSServerLong);

    // center of map
    var centerCoords = DNSServerCoords;

    // Create map
    var Map = L.map("Map", {zoomControl: false}).setView([0, 0], 2, {
        worldCopyJump: true
    });
    new L.Control.Zoom({position: 'topright'}).addTo(Map);
    // Retrieve map tile from mapbox
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
        '<a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 10,
        minZoom: 2,
        center: centerCoords,
        id: 'mapbox.dark',
        noWrap: false,
        accessToken: 'pk.eyJ1IjoiY2NoZXNsZXkyMzk3IiwiYSI6ImNqYTR4endzNTMxY2sycXFyemduaXIxM3EifQ.gvT6NeQ0Q6ykY8PVzMhTTw'
    }).addTo(Map);

    // Options for DNS server map marker
    var serverMarkerOptions = {
        radius: 13,
        fillColor: "#42e5f4",
        color: 'black',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    // Options for query source markers


    displayMapFeatures(Map, data, DNSServerCoords, queryMarkers, queryLines);

    var DNSServerCircle = L.circleMarker(DNSServerCoords, serverMarkerOptions).addTo(Map).bindPopup("DNS Server");

    Map.invalidateSize(true);             // resize map
}


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

function addRecordLegend(Map){
    var recLegend = L.control({position: 'bottomleft'});
    recLegend.onAdd = function (Map) {
        var div = L.DomUtil.create('div', 'info legend');
        var categories = ['A', 'AAAA', 'ANY', 'CNAME', 'MX', 'NS', 'PTR', 'SIG', 'SOA', 'SRV', 'TXT'];
        for (var i = 0; i < categories.length; i++) {
            div.innerHTML +=
                '<i class="circle" style="background:' + getRecordColor(categories[i]) + '"></i> ' +
                (categories[i] ? categories[i] + '<br>' : '+');
        }
        return div;
    };
    recLegend.addTo(Map);
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
        source = data[i]['source'];
        query = data[i]['query'];
        country = data[i]['country'];
        validation = data[i]['isvalid'];
        recordType = data[i]['record'];

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

        queryCoords = L.latLng(data[i]['lat'], data[i]['lon']);

        var toolTip = '' +
            "Source: " + source + "<br>" +
            "Query: " + query + "<br>" +
            "Country: " + country + "<br>" +
            "Record: " + recordType + "<br>" +
            "DNSSEC: " + validation + "<br>" +
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
    addRecordLegend(Map);
    displayTitle(Map, "DNS Map");

}