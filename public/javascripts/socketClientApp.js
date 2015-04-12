var app = angular.module('timerGame', ['btford.socket-io', 'ngCookies']);

app.factory('socket', function(socketFactory) {

  var myIoSocket = io.connect('http://localhost:3000');
  //var myIoSocket = io.connect('http://192.168.1.2:3000');

  mySocket = socketFactory({
    ioSocket: myIoSocket
  });

  return mySocket;
});

app.constant('second', 100);

app.controller("appController", function($scope, socket, $timeout, $http, second, $cookieStore) {

  $scope.users;

  var start = Date.now();
  var stop;

  $scope.showTime = 0;
  $scope.owner = undefined;
  $scope.username = undefined;
  $scope.chances = 3;
  $scope.hasChance = true;
  $scope.started = false;
  $scope.isAdmin = false;

  $scope.diff = 0;

  $http.put('/game/user', {username: $cookieStore.get('myUsername')}).success(function(response) {
    if (response === false) {
      window.location.href = '/';
    }
    console.log(response);
    $scope.username = response.user;
    $scope.chances = response.chances;
    $scope.isAdmin = response.isAdmin;
    $scope.users = response.users;
  });

  $scope.$watch('chances', function() {
    if ($scope.chances > 0) {
      $scope.hasChance = true;
    } else {
      $scope.hasChance = false;
    }
  });

  socket.on('adjustTime', function (response) {
    console.log(response);

    if (response.showTime <= 0) {
      alert("Winner is " + response.owner);
    }

    if (!$scope.started) {
      $scope.started = true;
    }

    $scope.showTime = response.showTime;
    $scope.owner = response.owner;

    if ($scope.owner === $scope.username) {
      $scope.chances -= 1;
    }

    stopTimer();
    start = Date.now();
    goTimer();
  });

  socket.on('gameOver', function (response) {

    $scope.showTime = 0;

    $timeout.cancel(stop);
    stop = undefined;

    // for timer sync test, not junk!!
    console.log(Date.now() - start);

    if (response.owner == $scope.username) {
      alert("You win!");
    } else {
      var owner = response.owner;
      if (response.owner === undefined) {
	      owner = 'Nobody';
      }
      alert("You lose! " + owner + " won the game!");
    }

    window.location.href = '/games';
  });

  $scope.resetTime = function() {
    if ($scope.hasChance) {
      socket.emit('resetTime', {username: $cookieStore.get("myUsername")});
      stopTimer();
    }
  }

  $scope.startGame = function() {
    socket.emit('startGame', {username: undefined});
  }

  function goTimer() {

    $scope.showTime -= 0.1;
    $scope.diff = (Date.now() - start) - (10 - $scope.showTime) * 1000;
    stop = $timeout(goTimer, second - $scope.diff);
  }

  function stopTimer() {
    $timeout.cancel(stop);
  }
});
