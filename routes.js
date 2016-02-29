module.exports = function(app){
    var summoners = require('./controllers/summoners');
    app.get('/api/summoner/ranked/:ID', summoners.findRankedByName);
    app.get('/api/summoner/basic/:name', summoners.findBasicByName);
}