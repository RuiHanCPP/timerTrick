var express = require('express');
var app = express();
var http = require('http');
var socketio = require('socket.io');
var server = http.createServer(app).listen(3000);
var io = socketio.listen(server);

var bodyParser = require('body-parser');
var multer = require('multer');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(multer()); 

// use dir
app.use(express.static(__dirname + '/public'));

var startTime = 0;
var curOwner = 0;
var gameIsRunning = false;
var timerRef;

console.log("Server starts!");

io.on('connection', function(socket) {

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
			clearTimeout(timerRef);
			timerRef = setTimeout(timerCheck, 10000);
		}
	});

	var timerCheck = function() {

		if (!gameIsRunning) {
			return;
		}
		if (Date.now() - startTime < 10000) {
			return;
		}
		gameIsRunning = false;

		socket.broadcast.emit('gameOver', {});
		socket.emit('gameOver', {});

		// for time sync test only, not junk
		console.log(Date.now() - startTime);

		console.log("Game over! The winner is " + curOwner);
	}

	socket.on('startGame', function() {
		
		if (!gameIsRunning) {
			startTime = Math.floor(Date.now());

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
			timerRef = setTimeout(timerCheck, 10000);
		}
	});
	
});