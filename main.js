var http = require("http");

var handle_it = function(req, resp) {
    console.log("Got request: " + req.method + ' ' + req.url + '\n');
   resp.writeHead(200,{'Content-Type': 'text/plain'});
    resp.end('Hello, World: You asked for ' + req.url + '\n');
}

var srv = http.createServer(handle_it);

srv.listen(8081);

var reqfunc = function(funcval){
var req = http.request('http://localhost:8081/' + funcval + '.html');
req.on('data',(resp) => {
    console.log('Got data: ' + resp.toString());
});


req.on('response',(msg) => {
    msg.on('data', (chunk) => {
        console.log('Got ' + chunk.length + ' bytes: ' + chunk.toString());
    
    });
    msg.on('end', () => {
        console.log('END of response.');
    });
});

req.on('close',() => {
    console.log('Closed.');
})

req.end();
}

setInterval(function() {reqfunc(Date.now())}, 2000);