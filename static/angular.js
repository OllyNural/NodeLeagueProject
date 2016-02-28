angular.module('main', [])
	.controller('controller-div', function($scope) {
	
	var pathArray = window.location.pathname.split('/');
	var levelLocation = pathArray[2];
	console.log("location: " + levelLocation);
	
	var sum;
	
	$.get("/api/summoner/" + levelLocation,
		function(data) {
			console.log(data);
			sum = data;
		});
		console.log("hello");
		$scope.greeting = {id: ' xxx', content: sum};
	})