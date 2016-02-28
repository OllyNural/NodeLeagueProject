module.exports = function(app){
    var summoners = require('./controllers/summoners');
    app.get('/api/summoners', summoners.findAll);
    app.get('/api/summoner/:name', summoners.findByName);
}