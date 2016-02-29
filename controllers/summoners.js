var request = require('superagent-cache')();
var APIKey = "896349ec-4ce2-49ed-be1a-b480bf0c7d49";

exports.findRankedByName = function(req, response) {
	var ID = req.params.ID;
	console.log("Retrieving ranked stats for: " + ID);
	request
	.get("https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/" + ID + "/entry?api_key=" + APIKey)
	.end(function(err, res) {
		if (err || !res.ok) {
			console.log("Could not find summoner ranked information for given ID");
			return response.send(500);
		} else {
			console.log("Found ranked information for:" + ID)
			return response.send(JSON.stringify(res.body));
		}
	});
};

exports.findBasicByName = function(req, response) {
	var username = req.params.name;
	console.log("Retrieving basic stats for: " + username);
	request
	.get("https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" + username + "?api_key=" + APIKey)
	.end(function(err, res) {
		console.log(res);
		console.log(err);
		if (err || !res.ok) {
			console.log("well something broke in your call");
			return response.sendStatus(500);
		} else {
			return response.send(JSON.stringify(res.body));
			console.log("We did it boys " + JSON.stringify(res.body));
		}
	});
};

exports.add = function() {};
exports.update = function() {};
exports.delete = function() {};