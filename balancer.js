var http = require('http');
var serverArray = ["http://localhost:1111", "http://localhost:2222", "http://localhost:3333"];
var indexServer = 0;

function callServer(req, res) {
  if(req.url == "/hello"){
    http.get(serverArray[indexServer], function(response) {
        var str = '';
        console.log(indexServer);
        //another chunk of data has been received, so append it to `str`
        response.on('data', function(chunk) {
            str += chunk;
        });

        //the whole response has been received, so we just print it out here
        response.on('end', function() {
            console.log(str);
            res.writeHead(200, {
              'Content-Type': 'text/html'
          });
          res.end(str);
        });

        if (indexServer == 2) {
            indexServer = 0;
        } else {
            indexServer += 1;
        }
    }).on('error', function(e) {
        console.info("server is not responding");
        if (indexServer == 2) {
            indexServer = 0;
        } else {
            indexServer += 1;
        }
        callServer(req, res);
    });
}
}
http.createServer(callServer).listen(9999);
console.info["Server running ...."];