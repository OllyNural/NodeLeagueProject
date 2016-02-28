var express = require("express");
var app = express();
var path    = require("path");

app.use(express.static(__dirname + '/static'));

app.get('/summoner/:summoner', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/singlesummoner.html'));
});

app.get('/summoner', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/missingsummoner.html'));
});

app.get('/university/:university', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/universitysummoner.html'));
});

app.get('/university', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/missinguniversity.html'));
});

require('./routes')(app);

app.listen(8080);