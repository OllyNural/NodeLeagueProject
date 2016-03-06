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
					{"summonerName": "SomeUsername8"},
					{"summonerName": "SomeUsername9"},
					{"summonerName": "SomeUsername10"}
		]
	}
	console.log("Total JSON from universityList: " + universityList);
	var summonerNameArray = universityList[code];

	// Sort the list into groups of 10
	// Return new data-type
	var finalUniversityArray = [];
	var summonersToSendToRanked = [];
	var summonersToSendToBasic = [];


	for (i = 0; i < summonerNameArray.length; i++) {
		console.log("Count: " + i);
		summonersToSendToBasic.push(summonerNameArray[i].summonerName);

		// Every 10 we can send the basic request to RIOT's API 
		if (i % 9 == 0 && i != 0 || i == summonerNameArray.length - 1) {
			console.log("Sending these summoners to basic API call: " + summonersToSendToBasic);
			var basicArray = "";
			console.log("Going to be sending the request to Riot's API");
			console.log("Some string: " + summonersToSendToBasic);
			// Clear the Array to start the whole process over again
			summonersToSendToBasic = [];
		}


	}

		response.send(summonerNameArray);

};


String.prototype.capitalize = function() {
    return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};