DNSMap

DNS Visualization Tool designed to provide a representation of DNS traffic on a network.
Information about records accessed will be presented, covering records handed out by the server. Statistics will be displayed about all packets captured during the current capture period.
Information about requests and reponses outside of the host network will be presented on a map, giving a geographic representation of the location of addresses being resolved by the tool.




Prerequisites

bind9


Installation

Install guide
To use the logreader to create csv's, change the file location in "logreader/dnsconf.py"

If you would like to keep your query logs, make sure this is pointed at a copy of your logs because it will destroy the logs in order to keep log size down

Run main.py with python 3.5 or higher, it will continuously read from the designated log and check in after the SLEEP\_TIMER interval

LOCATION\_URL is the designated api to reach out to for location data. If desired, this can be changed, but the findLocation() function may need to be updated to the requirements of that api

Built With

TODO - Add tools used 
D3.js - d3js.org
Leaflet - leafletjs.com
Mapbox - mapbox.com

Versioning


Authors

Caleb Chesley
Liam Decker
Andrew Gunkle


License

This project is licensed under the Apache License, Version 2.0
