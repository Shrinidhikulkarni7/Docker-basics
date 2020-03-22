// import required libraries/frameworks
const express = require('express'),
   path = require('path');

// create an express application.
const app = express();

// listen to GET request on http://127.0.0.1:8081/ and send a html page as response.
app.get('/', function (_, response) {   
   response
   // set status to 200.
   .status(200)
   // send absolute file path of index.html
   .sendFile(path.join(__dirname + '/index.html'));
});

// listen for connections.
app.listen(8081, function() {
   console.log('Server is up and running at http://127.0.0.1:8081/')
});
