var app = angular.module('gameCatagories', ['ngCookies']);

app.controller("appController", function($scope, $http, $cookieStore) {

	$scope.username = $cookieStore.get('myUsername');

	$scope.chooseGame = function() {
		console.log("ASDFASF");
		window.location.href = '/game';
	}
});