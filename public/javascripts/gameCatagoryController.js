var app = angular.module('gameCatagories', ['ngCookies']);

app.controller("appController", function($scope, $http, $location, $cookieStore) {

	$scope.username = $cookieStore.get('myUsername');

	$http.get("/games/user", function (response) {
		if (response.users.indexOf($scope.username) < 0) {
			window.location.href = '/';
		} 
	})

	$scope.chooseGame = function() {
		window.location.href = '/game';
	}
});