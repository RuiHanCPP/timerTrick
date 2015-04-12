var app = angular.module('userRegister', ['ngCookies']);

app.controller("appController", function($scope, $http, $location, $cookieStore) {

	$scope.incomplete = true;

	$scope.correct = true;

	$scope.username = "";

	$scope.$watch('username', function() {
		if ($scope.username.length < 3) {
			$scope.incomplete = true;
		} else {
			$scope.incomplete = false;
		}
	});

	$scope.submitUsername = function() {
		$http.post("/", {username: $scope.username}).success(function(response) {
			console.log(response);
			if (response) {
				$cookieStore.put('myUsername', $scope.username);
				window.location.href = '/games';
			} else {
				$scope.correct = false;
			}
		});
	}
});