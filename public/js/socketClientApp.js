var app = angular.module('timerGame', ['btford.socket-io']);

app.factory('socket', function(socketFactory) {

	// var myIoSocket = io.connect('http://somesite:port');
	var myIoSocket = io.connect('http://10.238.41.68:3000');

  	mySocket = socketFactory({
    	ioSocket: myIoSocket
	});

	return mySocket;
});

app.constant('second', 1000);

app.controller("appController", function($scope, socket, $interval, second) {

	var start = Date.now();
	var stop;
	var timeDiff = 0;

	$scope.showTime = undefined;
	$scope.owner = undefined

	socket.on('adjustTime', function (response) {

  		console.log(response);
		if (response.showTime <= 0) {
			alert("Winner is " + response.ip);
		} 

		$scope.showTime = response.showTime;
		$scope.owner = response.ip;
		timeDiff = 0;
		start = Date.now();
		stopTimer();
		goTimer();
	});

	socket.on('gameOver', function (response) {
		
		$interval.cancel(stop);
		stop = undefined;

		// for timer sync test, not junk!!
		console.log(Date.now() - start);

		if ($scope.owner == 'You') {
			alert("You win!");
		} else {
			alert("You lose!");
		}
		$scope.showTime = 0;
		timeDiff = 0;
	});

	$scope.resetTime = function() {

		socket.emit('resetTime', function() {});
		stopTimer();
	}

	$scope.startGame = function() {

		socket.emit('startGame', function() {});
	}

	function goTimer() {

		if (angular.isDefined(stop)) {
			return;
		}

		if ($scope.showTime <= 0) {
			$interval.cancel(stop);
			stop = undefined;
			$scope.showTime = 0;
		}

		stop = $interval(function() {

			$scope.showTime -= 1;

    		timeDiff = (Date.now() - start) - $scope.showTime;

		}, second - timeDiff);

	}

	function stopTimer() {

		if (angular.isDefined(stop)) {
			$interval.cancel(stop);
			stop = undefined;
		}
	}
	
});