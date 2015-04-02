var app = angular.module('timerGame', ['btford.socket-io']);

app.factory('socket', function(socketFactory) {
	var myIoSocket = io.connect('http://10.238.41.68:3000');

  	mySocket = socketFactory({
    	ioSocket: myIoSocket
	});

	return mySocket;
});

app.constant('aTime', 50);

app.controller("appController", function($scope, socket, $interval, aTime) {

	var stop;
	var counter;

	$scope.showTime = undefined;
	$scope.owner = undefined

	socket.on('adjustTime', function (response) {
  		console.log(response);
		if (response.showTime <= 0) {
			alert("Winner is " + response.ip);
		} 

		$scope.showTime = response.showTime;
		$scope.owner = response.ip;
		counter = 1000;
		stopTimer();
		goTimer();
		
	});

	$scope.resetTime = function() {
		socket.emit('resetTime', function() {});
		stopTimer();
	}

	$scope.startGame = function() {
		socket.emit('startGame', function() {});
	}

	function goTimer() {

		console.log("timer started");

		if (angular.isDefined(stop)) {
			return;
		} 

		stop = $interval(function() {
			counter -= aTime;
			if (counter == 0) {
				$scope.showTime -= 1;
				counter = 1000;
			}
		}, aTime);
	}

	function stopTimer() {

		console.log("timer stopped");

		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
		}
	}
	
});