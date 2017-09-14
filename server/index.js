var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var server = require('http').createServer(app);
var port = process.env.PORT || 5000;
var fs = require('fs');

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended:true
}))

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('public'));

app.post('/sync',function(req,res){
	var file = {
		"name":req.body.file,
		"content":req.body.content
	};
	fs.writeFile(__dirname+'/public/'+file.name, file.content, function(err) {
  	if(err) {
        return console.log(err);
    }
		console.log("The file was synchronised.");
	});
});

server.listen(port, function(){
	console.log('server listening on port '+port);
});
