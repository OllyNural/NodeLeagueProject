var express = require("express");
var app = express();
var path    = require("path");
var request = require('superagent-cache')();

var cookieString = "NUELSession=aq1cgcll0qtiu2mk0pcepgpz; NUELAuth=ZCeA_RhRVLVQYm8zy1NeMA-2BqkPIdJPDqMLUTpncxvfMRVNh7yIfj6SjBFeh4iWDd07Usd1oVr7vMyHZn3GuJpD5Ex-FbBxpUrRwI3X0T2h0e4MjTH71xu1g5ldVx6EDb9w3dvu9hx4ywsnjwta2StA5DFKZOrdcS73mg_aIx0Nx5TxBtgeLKzvN3lqnWH1Dx7WrDYboUnuAXfEgRzFUKcP71W8VsLQSKedCvx2uRKAjGiQYfME11Vz4MXglzeLW6RSTokQAhZ3YzZTGEltZ2VQoXsH6WpJ9B3jdbZcdvYVkpwLd0VHeaTlAK6GKLMnhJTtp4UcOOujHHzAWO957k-rBN1FCD-z56RF8HFvEe99K9_7oaZfyTo1otL6rHp6p-A2_WPqT0NCBK9xq3x6xCvsBufVjqQaKRdk7JLBXTUamFbI_9Fdz3t8R5Y_PQ9fhTDXreYBjnEQYp3rl5v-fJGEihm7hIizmQKnprCj_XCFz-VVtWKxvIaLTWBa1PhIwcMceSCCxzgXK_hRzHgicuZDhzY8kaD0btpDmD_pwheP5d3CpR3QRh-4fwzWmnlzh2Wk1yv-XCgp-V0S9KlmFYsszKkeL3QrhhgvU2BFYua3bf6ygBsrUTg88bnoGfNyCVbu7O1UweduxFyebDCPEPfsFLTJZ_fdmeZ8rqaPQ-E6R0EdCBtPaVmQ_iatafScT305BOOdjVxKs1tXK5952nMMXxu2glk2NsXoE9B9CmJ1DDG98gpoyaw767jaJmzbg8FRTZIu39EjzhpFgM2Oam0IZ3UnMoWf22FcB0oP0qR7O54J6l1csxOnElxqeZ054iRUIendo_YMaKwJ4ERNN9TpaLupEgHtXwu29nFF9-Oc5PgJAmfd_w2utd1a2ofzlaZ_AGIqJjI7P_CSpi3_I28fbjUzrwThi3Adgl-7HSMyONprhZt7xb3rGngbfamqw7JGhyZSE0u-LNiE_cwYF6Y-PoaR9XadezD1MmPbv8B0NgGM8H9KDoz08oZJqfC9xiLEtrsIBDWPQENbZuiMulVHDDiS1ILn4hYBspQasQXPOF4SHfehbNfKFWHylxEPXyuLZNuAdinsnM5pJ-DRTrdoVDtNI6-a6piS3sSYPRy9AoT8N9DlIVNLtptkoBU9tlWbr4GDDmKwaTv9NIcT8BTjqLwfds50SLSijnL32oovm1jFXp2ReUohTRA5JgbciWhftehqhXthaxHVp9TnrpxPWL-8HEOARtx7mdiinh31ddVgblCaGwh2Ykhj3EEwdJwEexJC9DrH4il01rz_gHwHv3ymcHrpo_R3aC_OT0SHk_yDSboM3V1LEkIHQUxt6hBVj-1Ue1bFcfrCoufXI4fpacQa9wYbe9GPlzSC-Aya6za2t6iP7UB_PSKZlc00;"

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

app.get('/error', function(req, res) {
	res.sendFile(path.join(__dirname + '/pages/error.html'));
});

require('./routes')(app);

app.listen(8080, function() {
	console.log("Server Running...");
	// $http({
 //            method: 'GET',
 //            url: "https://thenuel.com/university/3236"
 //        }).then(function succesCallbackA(data){
 //            console.log("HI");
 //            console.log(data);
 //        });
	var url = "https://thenuel.com/university/3236";
        request
        .get(url)
  		.set("Cookie", cookieString)
        .end(function(err, res) {
        	if (err) {
        		console.log(err);
        	} else {
        		// Parse the HTML here and send it all to a database
        		console.log(res);
        	}
        })
});