#DNSMap

DNS Visualization Tool designed to provide a representation of DNS traffic on a network.
Information about records accessed will be presented, covering records handed out by the server.
Statistics will be displayed about all packets captured during the current capture period.
Information about requests and reponses outside of the host network will be presented on a map,
giving a geographic representation of the location of addresses being resolved by the tool.


##Authors
Caleb Chesley - csc1918@rit.edu - Visualization and data interpretation
Liam Decker - wgd6034@rit.edu - DNS query collection and processing
Andrew Gunkle - arg5173@rit.edu - DNSSec validation and repository maintenance


##Prerequisites
bind9
Python 3.5 or higher
An internet connection for visualization

##Installation
###Logreader
To use the logreader to create csv's, change the file location in "logreader/dnsconf.py"
If you would like to keep your query logs, make sure this is pointed at a copy of your logs because it will destroy the logs in order to keep log size down
Run main.py with python 3.5 or higher, it will continuously read from the designated log and check in after the SLEEP\_TIMER interval
LOCATION\_URL is the designated api to reach out to for location data. If desired, this can be changed, but the findLocation() function may need to be updated to the requirements of that api
###Visualizer
The visualizer requires an initial internet connection for use unless manually reconfigured with local resources.
"index.html" includes a **"// config variables //"** field, which dictates the Latitude and Longitude of the DNS server,
and the source CSV to retrieve queries from.
Config variables:
    sourceFile: Path to the CSV file used for query input
    DNSServerLat: Geographic latitude for the DNS server hosting the logreader
    DNSServerLong: Geographic longitude for the DNS server hosting the logreader
CSV Format:
Day,Month,Year,Timestamp,SourceIP#SourcePort,query,Record Type,+,E,region,Region Name,Country,Country Code, Lat,Lon


##Resources
###Built With (Resource - Website - Use):
[IP API](ip-api.com) - Location resolution for IP addresses
[D3.js](d3js.org - Visualizer construction
Leaflet - leafletjs.com - Map function and geographic data visualization
Canvasjs - canvasjs.com - Statistics and charts
Mapbox - mapbox.com - Map tiles for Leaflet
    Accessing Mapbox map tiles requires an access key based on Mapbox tiers of service.
    The lowest tier is free.
    Enter the site and create an account for a limited key.


##License

This project is licensed under the Apache License, Version 2.0
