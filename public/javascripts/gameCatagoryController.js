var app = angular.module('gameCatagories', ['ngCookies']);

app.controller("appController", function($scope, $http, $location, $cookieStore) {

	$scope.username = $cookieStore.get('myUsername');

	$scope.chooseGame = function() {
		window.location.href = '/game';
	}
});