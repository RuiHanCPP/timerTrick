var app = angular.module('timerGame', []);

app.controller("appController", function($scope, $http) {
	$http.get("/game").success(function(response) {
		if (response.showTime <= 0) {
			alert("Wow");
		} else {
			$scope.time = response;
		}
	});

	$scope.resetTime = function() {
		console.log(new Date().getTime());
		$http.put("/game", {}).success(function(response) {
			$scope.time = response;
		});
	}
	
})