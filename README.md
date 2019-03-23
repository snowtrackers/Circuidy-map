# Circuidy-map

Map backend for Circuidy app

## Start server

    npm install
    node server.js
    
Server will serve on port 3000
    
## How interact with it

Just send POST request like that :

    IP:3000/notifications?lat=12&lon=15&type=3&message=Dommage test
    
 - lat : Latitude in decimal
 - lon : Longitude in decimal
 - type : Various PIN
   - DANGER
   - DUSTBIN
   - SMILE
   - BAD_ROAD
   - BROKEN_SIGN
   - APPLE
 - message : Message to accompagne notification