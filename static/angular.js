angular.module('main', [])
    .controller('controller-div', function($scope, $http) {

        var pathArray = window.location.pathname.split('/');
        var levelLocation = pathArray[2];
        console.log("username: " + levelLocation);

        // This is the basic API call
        // This is called for very summoner, and it returns a cached (15min) state

        $http({
            method: 'GET',
            url: "/api/summoner/basic/" + levelLocation
        }).then(function succesCallback(data) {
            console.log("Data received from basic call: \n");
            console.log(data.data);
            // Sets the boolean summoner to true
            $scope.doesSummonerExist = true;         

            for (var key in data.data) {
                $scope.summoner = {
                    "id": data.data[key].id, 
                    "name": data.data[key].name,
                    "iconId": data.data[key].profileIconId,
                    "revData": data.data[key].revisionDate,
                    "summonerLevel": data.data[key].summonerLevel
                };
            }



            // Here we can do another call for champion masteries
            // As we know the player exists so no wasted calls

            $http({
                method: 'GET',
                url: '/api/summoner/mastery/' + data.data[key].id
            }).then(function success)






            // This is the ranked call
            // This is only called in the event of the summoner existing
            // i.e first call succeeding. 

            $http({
                method: 'GET',
                url: "/api/summoner/ranked/" + data.data[key].id
            }).then(function succesCallback(rankedData) {
                console.log("Data received from ranked call: \n");
                console.log(rankedData.data);
                // Sets the boolean ranked to true;
                $scope.doesRankingExist = true;

                $scope.ranking = {
                    "rankedEntries": rankedData.data[data.data[key].id]
                    ""
                    // Check whether you can reference the objects in the front end
                    // Without assigning them here e.g just rankedEntries or
                    // rankedEntries.id etc...
                };

            }, function errorCallback(data) {
                if (data.status == 404) {
                    console.log("ERROR CODE: " + data.  status + ". No ranked stats for given ID");
                    // Sets the boolean ranked to false
                    $scope.doesRankingExist = false;
                } else if (data.status == 500) {
                    console.log("ERROR CODE: " + data.status + ". Internal server error");
                    window.location = "/error";
                } else if (data.status > 400) {
                    console.log("ERROR CODE: " + data.status + ". Something different went wrong");
                    window.location = "/error";
                } 
            });









        }, function errorCallback(data) {
            if (data.status == 404){
                // Sets the boolean summoner to false
                $scope.doesSummonerExist = false;
            } else if (data.status == 500) {
                console.log("ERROR CODE: " + data.status + ". Internal server error");
                window.location = "/error";
            }
        });

    });