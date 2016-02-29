angular.module('main', [])
    .controller('controller-div', function($scope, $http) {

        var pathArray = window.location.pathname.split('/');
        var levelLocation = pathArray[2];
        console.log("username: " + levelLocation);

        $http({
            method: 'GET',
            url: "/api/summoner/basic/" + levelLocation
        }).then(function succesCallback(data) {
            console.log("Data received from basic call: \n");
            console.log(data.data);
            $scope.doesSummonerExist = true;         

            for (var key in data.data) {
                $scope.summoner = {
                    "ident": data.data[key].id, 
                    "name": data.data[key].name};
            }







            $http({
                method: 'GET',
                url: "/api/summoner/ranked/" + data.data[key].id
            }).then(function succesCallback(data) {
            console.log("Data received from ranked call: \n");
            console.log(data.data);
            $scope.doesRankingExist = true;

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
        });


        }, function errorCallback(data) {
            if (data.status == 404){
                $scope.doesSummonerExist = false;
                console.log($scope.doesSummonerExist);
            } else if (data.status == 500) {
                console.log("ERROR CODE: " + data.status + ". Internal server error");
                window.location = "/error";
            }
        });

        
    });