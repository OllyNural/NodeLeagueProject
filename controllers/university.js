var request = require('superagent-cache')();
var APIKey = "896349ec-4ce2-49ed-be1a-b480bf0c7d49";

exports.findAllByCode = function(req, response) {
	var code = req.params.code.toUpperCase();
	console.log("Code: " + code);
	var universityList =  {
		"UKC": [
					{"summonerName": "TheBlackSceptre"},
					{"summonerName": "Aloadofbarnacles"},
					{"summonerName": "im kai"},
					{"summonerName": "SomeIncorrectUsername"},
					{"summonerName": "SomeUsername1"},
					{"summonerName": "SomeUsername2"},
					{"summonerName": "SomeUsername3"},
					{"summonerName": "SomeUsername4"},
					{"summonerName": "SomeUsername5"},
					{"summonerName": "SomeUsername6"},
					{"summonerName": "SomeUsername7"},
					{"summonerName": "ORPHIUS"},
					{"summonerName": "SomeUsername9"},
					{"summonerName": "SomeUsername10"},
					{"summonerName": "SomeUsername11"},
					{"summonerName": "SomeUsername12"},
					{"summonerName": "Being"},
					{"summonerName": "SomeUsername14"},
					{"summonerName": "SomeUsername15"},
					{"summonerName": "SomeUsername16"},
					{"summonerName": "SomeUsername17"},
					{"summonerName": "SomeUsername18"},
					{"summonerName": "TheBlackSpectre"}
		]
	}
	console.log("Total JSON from universityList: " + universityList);
	var summonerNameArray = universityList[code];

	var finalUniversityArray = [];
	var IDsToSendToRanked = [];
	var IDsToSendToRankedCounted = [];
	var summonersToSendToBasic = [];

	if (universityList.length == 0 || summonerNameArray == 0) {
		return response.sendStatus(400);
	}
 
	for (i = 0; i < summonerNameArray.length; i++) {
		console.log("Count: " + i);
		summonersToSendToBasic.push(summonerNameArray[i].summonerName);

		// Every 10 we can send the basic request to RIOT's API 
		if (i % 9 == 0 && i != 0 || i == summonerNameArray.length - 1) {
			console.log("Sending these summoners to basic API call: " + summonersToSendToBasic);
			var URL = "https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" 
				+ summonersToSendToBasic 
				+ "?api_key=" 
				+ APIKey;

			request
			.get(URL)
			.end(function(err, res) {
				if (res.statusCode != 404 || res.statusCode != 400) {
					console.log(res.body);
					console.log(JSON.stringify(res.body));

					//TODO ~~ Fix this to make it more efficient
					for (var username in res.body) {
						console.log(res.body[username].id);
						IDsToSendToRanked.push(res.body[username].id);
					}
				} 
			});

			// Clear the Array to start the whole process over again
			summonersToSendToBasic = [];
		}
	}

	// Here we are assuming that all the IDs are working from the previous call.
	// We will make the university call with all the working IDs from the previous call
	// Only when the list changes will our cache be nullified. 


	//~~ Here we are checking if the call can go through without cutting it up
	if (IDsToSendToRanked.length <= 40) {
		// Here we send the call to Riot's API
		console.log("The list was below 40");
		console.log("Sending these summoners to ranked API call: " + IDsToSendToRankedCounted);
			var URL = "https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/" 
				+ summonersToSendToBasic 
				+ "/entry?api_key=" 
				+ APIKey;

			request
			.get(URL)
			.end(function(err, res) {
				if (res.statusCode != 404 || res.statusCode != 400) {
					console.log(res.body);
					console.log(JSON.stringify(res.body));

					return response.send(JSON.stringify(res.body));
				} 
			});
	}

	console.log("The list was over 40");
	//~~ Oh no! It's longer than 40 IDs. We will need to make multiple calls!
	//~~ Lets try to make this more efficient shall we?
	for (i = 0; i < IDsToSendToRanked.length; i++) {
		//TODO - Work out how to nest these, should be fine but what is actually happening? ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
		IDsToSendToRankedCounted.push(IDsToSendToRanked[i]);

		 if (i % 39 == 0 && i != 0 || i == IDsToSendToRanked.length - 1) {
			// Here we add them to IDsToSendToRankedCounted
			console.log("Sending these summoners to ranked API call: " + IDsToSendToRankedCounted);
			var URL = "https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/" 
				+ summonersToSendToBasic 
				+ "/entry?api_key=" 
				+ APIKey;

			request
			.get(URL)
			.end(function(err, res) {
				if (res.statusCode != 404 || res.statusCode != 400) {
					console.log(res.body);
					
					finalUniversityArray.push(res.body));
				} 
			});

			IDsToSendToRankedCounted = [];
		 }
	}

	console.log(finalUniversityArray);
	return  respones.send(JSON.stringify(finalUniversityArray));

};