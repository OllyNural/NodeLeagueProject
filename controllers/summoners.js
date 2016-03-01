var request = require('superagent-cache')();
var APIKey = "896349ec-4ce2-49ed-be1a-b480bf0c7d49";

exports.findRankedByName = function(req, response) {
	var ID = req.params.ID;
	console.log("Retrieving ranked stats for: " + ID);
	request
	.get("https://euw.api.pvp.net/api/lol/euw/v2.5/league/by-summoner/" + ID + "/entry?api_key=" + APIKey)
	.end(function(err, res) {
		if (res.statusCode == 404) {
			return response.sendStatus(res.statusCode);
		} else if (res.statusCode < 400) {
			return response.send(JSON.stringify(res.body));
		} else {
			return response.sendStatus(res.statusCode);
		}
	});
};

exports.findBasicByName = function(req, response) {
	var username = req.params.name;
	console.log("Retrieving basic stats for: " + username);
	request
	.get("https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" + username + "?api_key=" + APIKey)
	.end(function(err, res) {
		if (res == undefined) {
			return response.sendStatus(500);
		} else if (res.statusCode == 404) {
			return response.sendStatus(404);
		} else if (res.statusCode > 400) {
			return response.sendStatus(500);
		} else {
			return response.send(JSON.stringify(res.body));
		}
	});
};

exports.add = function() {};
exports.update = function() {};
exports.delete = function() {};