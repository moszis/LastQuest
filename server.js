// Dependencies
var express  = require('express');
var http     = require('http');
const path   = require('path');
var socketIO = require('socket.io');

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app.set('port', 5000);
app.use('/client', express.static(__dirname + '/client'));


// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'client/index.html'));
});

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});