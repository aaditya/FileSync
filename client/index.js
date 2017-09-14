var server = require('http').createServer();
var port = process.env.PORT || 3000;
var request = require('request');
var fs = require('fs');

var parentDir = '/home/aaditya/Desktop/sync';

fs.watch(parentDir, {recursive : true}, function(eventType, filename){
	console.log('event type is: '+eventType);
	if(filename){
		console.log('filename provided: '+filename);
		if(eventType == 'change'){
      /*Notice changes, generate a json request and send it to cloud.*/
      fs.readFile(parentDir+'/'+filename, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        var changes = {
          "action":"add",
          "file":filename,
          "content": data
        };
        request.post('http://localhost:5000/sync',{json: changes},
          function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body)
            }
            console.log('Change Synchronised.')
          });
      });
	  }
}
});

server.listen(port, function(){
	console.log('server listening on port '+port);
});
