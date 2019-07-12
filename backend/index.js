var http = require("http");
//importing node framework
var express = require('express');
 
var app = express();

//Respond with "hello world" for requests that hit our root "/"
app.get('/', function (req, res) {
   res.send('hello me');
});
//listen to port 8080 by default
app.listen(process.env.PORT || 8080);
   
module.exports = app;

//http.createServer(function (request, response) {
   // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
//   response.writeHead(200, {'Content-Type': 'text/plain'});
   
   // Send the response body as "Hello World"
//   response.end('Hello World 2\n');
//}).listen(8080);

// Console will print the message
console.log('Server running');