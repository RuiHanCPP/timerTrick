var express = require('express');
var app = express();
var http = require('http');
var socketio = require('socket.io');
var server = http.createServer(app).listen(3000);
var io = socketio.listen(server);

var bodyParser = require('body-parser');
var multer = require('multer');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.use(express.static(__dirname + '/public'));

var startTime = 0;
var curOwner = 0;
var gameIsRunning = false;

/*
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
*/

io.on('connection', function(socket) {

	// TODO
	// how to constantly check time and see if the time is up??

	socket.on('resetTime', function() {

		if (gameIsRunning) {
			console.log('resetTime' + socket.request.connection.remoteAddress);

			curOwner = socket.request.connection.remoteAddress;
			socket.broadcast.emit('adjustTime', {
				serverTime: Date.now(),
				showTime: 10,
				ip: curOwner
			});
			socket.emit('adjustTime', {
				serverTime: Date.now(),
				showTime: 10,
				ip: "You"
			});
		}
	});

	socket.on('startGame', function() {
		
		//if (!gameIsRunning) {
			startTime = Math.floor(Date.now() / 1000);

			console.log('startGame' + socket.request.connection.remoteAddress);

			socket.broadcast.emit('adjustTime', {
				serverTime: Date.now(),
				showTime: 10,
				ip: curOwner
			});
			socket.emit('adjustTime', {
				serverTime: Date.now(),
				showTime: 10,
				ip: curOwner
			});
			gameIsRunning = true;
		//}
	});
	
});