var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

var startTime = Math.floor(Date.now() / 1000);
var curOwner = 0;

app.get("/game", function(req, res) {
	var showTime = 11 - (Math.floor(Date.now() / 1000) - startTime);
	res.json({serverTime: new Date().getTime(), showTime: showTime, ip: curOwner});
});

app.put("/game", function(req, res) {
	var showTime = 11 - (Math.floor(Date.now() / 1000) - startTime);
	if (showTime > 0) {
		curOwner = req.ip;
		res.json({serverTime: new Date().getTime(), showTime: showTime, ip: curOwner});
	}
});

app.listen(3000);