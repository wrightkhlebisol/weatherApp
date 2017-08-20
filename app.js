// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// SERVICES
weatherApp.service('cityService', function(){
	this.city = 'New York, NY';

});

//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
	$scope.city = cityService.city;
	$scope.$watch('city', function(){
		cityService.city = $scope.city;
	});
	
}]);

weatherApp.controller('resultsController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){

	$scope.city = cityService.city;

	$scope.days = $routeParams.days || 2;

	$scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
		{callback: 'JSON_CALLBACK'}, {get: {method: 'JSONP'}}
	);

	$scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days});

	$scope.convertToFahrenheit = function(degk){
		return Math.round((1.8 * (degk - 273)) + 32);
	}

	$scope.convertToDate = function(dt){
		return new Date(dt * 1000);
	}


}]);

// ROUTING
weatherApp.config(function($routeProvider){

	$routeProvider
	
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'homeController',
	})

	.when('/results', {
		templateUrl: 'pages/results.html',
		controller: 'resultsController',
	})

	.when('/results/:days', {
		templateUrl: 'pages/results.html',
		controller: 'resultsController',
	})
});
