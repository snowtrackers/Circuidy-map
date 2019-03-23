var WebSocketServer = require('websocket').server;
var http = require('http');

const express = require('express');
var bodyParser     =        require("body-parser");
const app = express();

var fs = require('fs');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);
    console.log("Client connecté")

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message
        }
    });

    connection.on('close', function(connection) {
        console.log("Client déconnecté")
    });
});

app.get('/', function (req, res) {
    fs.readFile('static/index.html', 'utf8', function(err, contents) {
        res.send( contents );
    });
});

app.post('/notifications', function (req, res) {
    console.log( req.query );
    if( req.query.type !== undefined && req.query.message !== undefined && req.query.lat !== undefined && req.query.lon !== undefined ) {
        if( wsServer !== undefined ) {
            wsServer.broadcast( JSON.stringify({
                type: req.query.type,
                message: req.query.message,
                lat: req.query.lat,
                lon: req.query.lon,
                date: Date.now().toString()
            }))
            res.status(200).end();
        }
    }
    res.status(400).end();
});

app.use('/public', express.static(__dirname + '/node_modules'))
app.use('/static', express.static(__dirname + '/static'))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.listen(3000, function () {
    console.log('Running !')
})