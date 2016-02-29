angular.module('main', [])
    .controller('controller-div', function($scope, $http) {

        var pathArray = window.location.pathname.split('/');
        var levelLocation = pathArray[2];
        console.log("location: " + levelLocation);

        $http({
            method: 'GET',
            url: "/api/summoner/basic/" + levelLocation
        }).then(function succesCallback(data) {
            // Here you assign the basic variables
            // Assign the basic stuff to use to show basic information
            console.log("Data received from basic call: " + data.data);
            $scope.summoner.id = data.data.asda.id;
            $scope.summoner.name = data.data.asda.name;
            $scope.summoner.id = data.data.asda.id;
            $scope.summoner.id = data.data.asda.id;
            $scope.summoner.id = data.data.asda.id;
        }, function errorCallback(data) {
            if (data.status == 404){
                console.log("ERROR CODE: " + data.status + ". You got the wrong summoner mate");
                window.location = "/summoner";
            } else if (data.status == 500) {
                console.log("ERROR CODE: " + data.status + ". Internal server error");
                window.location = "/error";
            }
        });



            // MOVE TO ON SUCCESS CALBACK DO THE RANKED ONE


        $http({
           method: 'GET',
           url: "/api/summoner/ranked/" + levelLocation
        }).then(function succesCallback(data) {
           console.log("Data received from ranked call: " + data.data);
            //Here you assign the ranked variables
            //Loop through and assign, then you can make it look pretty!
        }, function errorCallback(data) {
            if (data.status == 404) {
                console.log("ERROR CODE: " + data.status + ". No ranked stats for given ID");
                $scope.doesRankingExist = false;
            } else if (data.status == 500) {
                console.log("ERROR CODE: " + data.status + ". Internal server error");
                window.location = "/error";
            } else if (data.status > 400) {
                console.log("ERROR CODE: " + data.status + ". Something else went wrong");
                window.location = "/error";
            }
            $scope.doesRankingExist = true;
        });
    });