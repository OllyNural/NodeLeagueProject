    angular.module('main', [])
    .controller('controller-div', function($scope, $http) {
        $scope.doesSummonerExist = true;         

        var pathArray = window.location.pathname.split('/');
        var levelLocation = pathArray[2];

        // This is the basic API call
        // This is called for very summoner, and it returns a cached (15min) state

        $http({
            method: 'GET',
            url: "/api/summoner/basic/" + levelLocation
        }).then(function succesCallback(data) {
            console.log("Data received from basic call: ");
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
            };


            // Here we can do another call for champion masteries
            // As we know the player exists so no wasted calls

            // $http({
            //     method: 'GET',
            //     url: '/api/summoner/mastery/' + data.data[key].id
            // }).then(function success)



            // This is the ranked call
            // This is only called in the event of the summoner existing
            // i.e first call succeeding. 

            $http({
                method: 'GET',
                url: "/api/summoner/ranked/" + data.data[key].id
            }).then(function succesCallback(rankedData) {
                console.log("Data received from ranked call: \n");
                console.log(rankedData.data[data.data[key].id]);
                // Sets the boolean ranked to true;
                $scope.doesRankingExist = true;

                // We're assuming there are rankings for this person
                if (rankedData.data[data.data[key].id][0].queue == "RANKED_SOLO_5x5") {
                    if (rankedData.data[data.data[key].id][0].entries[0].miniSeries != undefined) {
                        $scope.soloqDoesMiniEntryExist = true;
                        $scope.soloqrankingminiseries = {
                            "target": rankedData.data[data.data[key].id][0].entries[0].miniSeries.target,
                            "wins": rankedData.data[data.data[key].id][0].entries[0].miniSeries.wins,
                            "losses": rankedData.data[data.data[key].id][0].entries[0].miniSeries.losses,
                            "progress": rankedData.data[data.data[key].id][0].entries[0].miniSeries.progress
                        }
                    }
                    $scope.rankingsoloq = {
                        "name": rankedData.data[data.data[key].id][0].name,
                        "tier": rankedData.data[data.data[key].id][0].tier,
                        "queue": rankedData.data[data.data[key].id][0].queue,
                        "division": rankedData.data[data.data[key].id][0].entries[0].division,
                        "LP": rankedData.data[data.data[key].id][0].entries[0].leaguePoints
                    };
                }

            }, function errorCallback(data) {
                $scope.rankingsoloq = {
                    "ranking": "Unranked"
                };
                if (data.status == 404) {
                    console.log("ERROR CODE: " + data.status + ". No ranked stats for given ID");
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
    })

    .controller('university-controller-div', function($scope, $http) {
        console.log("Got here");
        var pathArray = window.location.pathname.split('/');
        var universityCode = pathArray[2];
        console.log(universityCode);
        $http({
            method: 'GET',
            url: "/api/university/code/" + universityCode
        }).then(function succesCallback(data) {
            $scope.doesUniversityExist = true;
            console.log("Success Call back");
            console.log(data.data);
        }, function errorCallback(data) {
            console.log("Error call back");
            console.log(data);
        });
    });