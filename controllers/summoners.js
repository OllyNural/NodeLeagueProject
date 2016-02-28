var request = require('superagent-cache')();

exports.findAll = function(req, res) {
	res.send([
		{
			"id":1,
			"name":"Olly"
		}
	]);
};


exports.findByName = function(req, response) {
	var username = req.params.name;
	var APIKey = "896349ec-4ce2-49ed-be1a-b480bf0c7d49";
	console.log(username);
	request
	.get("https://euw.api.pvp.net/api/lol/euw/v1.4/summoner/by-name/" + username + "?api_key=" + APIKey)
	.end(function(err, res) {
		if (err || !res.ok) {
			console.log("well something broke in your call");
		} else {
			console.log("We did it boys " + JSON.stringify(res.body));
		}
		return response.send(JSON.stringify(res.body));
	});
	
};

exports.add = function() {};
exports.update = function() {};
exports.delete = function() {};