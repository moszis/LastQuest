import router from './server/routes';
// Dependencies
var express  = require('express');
var http     = require('http');
const path   = require('path');

var app = express();
var server = http.Server(app);

/***************************/
//TODO: Temporarily doing this manually until I figure out how to prevent webpack
//      from resetting __dirname
/**************************/
__dirname = path.resolve();


app.set('port', 5000);


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/client', express.static(__dirname + '/client'));
app.use('/dist', express.static(__dirname + '/dist'));

// Routing
app.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, 'client/index.html'));
});

app.use('/services', router());

console.log("GOT ROUTER");

// Starts the server.
server.listen(5000, function() {
  console.log('Starting server on port 5000');
});