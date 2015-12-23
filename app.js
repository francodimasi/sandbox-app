// Dependency Modules
var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cfenv = require('cfenv');
var moment = require('moment');
var debug = require('debug');

var routes = require('./routes/api');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Mount Middleware
app.use('/', routes);

// Set Port.
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// Create HTTP server.
http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});

// Load appEnv from CF and Twitter Credentials from GNIP.
var appEnv = cfenv.getAppEnv();
app.set('twitterCreds', getTwitterService(appEnv));

function getTwitterService(appEnv) {
  // retrieve the credentials the Twitter service by name
  var twitterCreds = appEnv.getServiceCreds("twitterinsights");
  if (!twitterCreds) {
    console.error("No Twitter service named 'twitterinsights' found");
    return "No Credentials available for Twitter";
  }
  return twitterCreds.url;
}

// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}
