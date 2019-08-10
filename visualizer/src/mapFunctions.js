



function createMap(data, DNSServerLat, DNSServerLong){
    var queryMarkers = [];
    var queryLines = [];
    // latLng object with DNS server coordinates
    var DNSServerCoords = L.latLng(DNSServerLat, DNSServerLong);

    // Create map
    var Map = L.map("Map", {zoomControl: false}).setView([0, 0], 2, {
        worldCopyJump: true
    });
    new L.Control.Zoom({position: 'topright'}).addTo(Map);


    // Options for query source markers


    displayMapFeatures(Map, data, DNSServerCoords, queryMarkers, queryLines);

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

function getRecordArray(record){
    return record === "A" ? 0 :
        record === "AAAA" ? 1 :
            record === "ANY" ? 2 :
                record === "CNAME" ? 3 :
                    record === "MX" ? 4 :
                        record === "NS" ? 5 :
                            record === "PTR" ? 6 :
                                record === "SIG" ? 7 :
                                    record === "SOA" ? 8 :
                                        record === "SRV" ? 9 :
                                            record === "TXT" ? 10 :
                                                11
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

    var queryCoords;
    var query;
    var country;
    var source;
    var validation;
    var validationColor;    // Red if DNSsec failed for query, green otherwise
    var recordType;
    var marker;
    var line;

    // Options for DNS server map marker
    var serverMarkerOptions = {
        radius: 13,
        fillColor: "#42e5f4",
        color: 'black',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    };

    var mapTiles = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © ' +
        '<a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 10,
        minZoom: 2,
        center: DNSServerCoords,
        id: 'mapbox.dark',
        noWrap: false,
        accessToken: 'pk.eyJ1IjoiY2NoZXNsZXkyMzk3IiwiYSI6ImNqYTR4endzNTMxY2sycXFyemduaXIxM3EifQ.gvT6NeQ0Q6ykY8PVzMhTTw'
    });

    Map.addLayer(mapTiles);

    // record arrays
    var Aobjects = [], AAAAobjects = [], ANYobjects = [],
    CNAMEobjects = [], MXobjects = [], NSobjects = [],
    PTRobjects = [], SIGobjects = [], SOAobjects = [],
    SRVobjects = [], TXTobjects = [], FAILobjects = [];

    var objects = [Aobjects, AAAAobjects, ANYobjects,
    CNAMEobjects, MXobjects, NSobjects, PTRobjects,
    SIGobjects, SOAobjects, SRVobjects, TXTobjects, FAILobjects];

    for (var i = 0; i < data.length; i++) {
        source = data[i]['source'];
        query = data[i]['query'];
        country = data[i]['country'];
        validation = data[i]['isvalid'];
        recordType = data[i]['record'];

        validationColor = getRecordColor(recordType);

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
            fillColor: "#c10a00",
            color: 'black',
            weight: 1,
            opacity: 1,
            fillOpacity: 1
        };

        queryCoords = L.latLng(data[i]['lat'], data[i]['lon']);
        var pointA = queryCoords;
        var pointB = DNSServerCoords;
        var pointList = [pointA, pointB];

        var toolTip = '' +
            "Source: " + source + "<br>" +
            "Query: " + query + "<br>" +
            "Country: " + country + "<br>" +
            "Record: " + recordType + "<br>" +
            "DNSSEC: " + validation + "<br>" +
            queryCoords + "<br>";

        // add new circle marker for query to queryMarkers list
        if (validation === "pass") {
            // generate circle marker and add to associated array
            marker = new L.circleMarker(queryCoords, queryMarkerOptions)
                .bindTooltip(toolTip);
            queryMarkers.push(marker);
            var recordIndex = getRecordArray(recordType);
            objects[recordIndex].push(marker);

            // generate line and add to associated array
            line = new L.polyline(pointList, {
                color: validationColor,
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
            });
            queryLines.push(line);
            objects[recordIndex].push(line);

        }
        else {
            var failedMarker = new L.circleMarker(queryCoords, failedQueryMarkerOptions)
                .bindTooltip(toolTip)
                .addTo(Map)
                .bringToFront();
            queryMarkers.push(failedMarker);
            objects[11].push(failedMarker);
            var failedLine = new L.polyline(pointList, {
                color: "#c10a00",
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
            });
            queryLines.push(failedLine);
            objects[11].push(failedLine);
        }
    }

    var Arecords = L.layerGroup(objects[0]);
    Map.addLayer(Arecords);
    var AAAArecords = L.layerGroup(objects[1]);
    Map.addLayer(AAAArecords);
    var ANYrecords = L.layerGroup(objects[2]);
    Map.addLayer(ANYrecords);
    var CNAMErecords = L.layerGroup(objects[3]);
    Map.addLayer(CNAMErecords);
    var MXrecords = L.layerGroup(objects[4]);
    Map.addLayer(MXrecords);
    var NSrecords = L.layerGroup(objects[5]);
    Map.addLayer(NSrecords);
    var PTRrecords = L.layerGroup(objects[6]);
    Map.addLayer(PTRrecords);
    var SIGrecords = L.layerGroup(objects[7]);
    Map.addLayer(SIGrecords);
    var SOArecords = L.layerGroup(objects[8]);
    Map.addLayer(SOArecords);
    var SRVrecords = L.layerGroup(objects[9]);
    Map.addLayer(SRVrecords);
    var TXTrecords = L.layerGroup(objects[10]);
    Map.addLayer(TXTrecords);
    var FAILrecords = L.layerGroup(objects[11]);
    Map.addLayer(FAILrecords);

    var overlays = {
        "A": Arecords,
        "AAAA": AAAArecords,
        "ANY": ANYrecords,
        "CNAME": CNAMErecords,
        "MX": MXrecords,
        "NS": NSrecords,
        "PTR": PTRrecords,
        "SIG": SIGrecords,
        "SOA": SOArecords,
        "SRV": SRVrecords,
        "TXT": TXTrecords,
        "Failed DNSSEC": FAILrecords
    };

    var DNSServerCircle = L.circleMarker(DNSServerCoords, serverMarkerOptions).addTo(Map).bindPopup("DNS Server");

    var mapLayer = {
        "Map": mapTiles
    };

    L.control.layers(mapLayer, overlays)
        .addTo(Map);


    addLegend(Map);
    addRecordLegend(Map);
    displayTitle(Map, "DNS Map");

}