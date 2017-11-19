DNSMap

DNS Visualization Tool designed to provide a representation of DNS traffic on a network.
Information about records accessed will be presented, covering records handed out by the server.
Statistics will be displayed about all packets captured during the current capture period.
Information about requests and reponses outside of the host network will be presented on a map,
giving a geographic representation of the location of addresses being resolved by the tool.




Prerequisites

bind9


Installation

Logreader
To use the logreader to create csv's, change the file location in "logreader/dnsconf.py"

If you would like to keep your query logs, make sure this is pointed at a copy of your logs because it will destroy the logs in order to keep log size down

Run main.py with python 3.5 or higher, it will continuously read from the designated log and check in after the SLEEP\_TIMER interval

LOCATION\_URL is the designated api to reach out to for location data. If desired, this can be changed, but the findLocation() function may need to be updated to the requirements of that api

Visualizer

The visualizer requires an initial internet connection for use unless manually reconfigured with local resources.
"index.html" includes a "// config variables //" field, which dictates the Latitude and Longitude of the DNS server,
and the source CSV to retrieve queries from.
CSV Format:
Day,Month,Year,Timestamp,SourceIP#SourcePort,query,Record Type,+,E,region,Region Name,Country,Country Code, Lat,Lon


Built With

D3.js - d3js.org
Leaflet - leafletjs.com
Mapbox - mapbox.com


Authors

Caleb Chesley - csc1918@rit.edu
Liam Decker
Andrew Gunkle


License

This project is licensed under the Apache License, Version 2.0
