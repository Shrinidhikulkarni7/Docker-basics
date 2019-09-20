let http = require("http");
let fileSystem = require('fs')

http.createServer(function (request, response) {
   // 1. Send the HTTP header 
   // 2. HTTP Status: 200 : OK
   // 3. Content Type: text/html
   // We specify text/html to tell the browser to render a html page for us.
   // Task: Try what happens when you change this to 'text/plain'. 
   response.writeHead(200, {'Content-Type': 'text/html'});

   // read the html document index.html
   // 1. path of the file
   // 2. options: encoding, flags
   // 3. callback function
   fileSystem.readFile('./index.html', null, (error, data) => {
      // if there is an error, return the error message.
      if(error) {
         // response status
         response.writeHead(404);
         // response body
         response.write('Document is missing chief :/');
      } else {
         // if the read was successful, send a chunk of response body.
         response.write(data);
      }
      // Indicate server has sent all headers and body and the message is complete.
      response.end();
   })
}).listen(8081);

// Console will print the message
console.log('Server running at http://127.0.0.1:8081/');
