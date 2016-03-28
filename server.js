var express = require("express");
var app = express();
var path    = require("path");
var cheerio = require('cheerio')

var request = require('superagent-cache')();

var requestNew = require('request');

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
	var url = "https://login.thenuel.com/authenticate/login?ReturnUrl=%2Fauthorize%3Fresponse_type%3Dcode%26client_id%3Dc82cb4c9-7cfa-4483-938b-2d3c61efabea%26redirect_uri%3Dhttps%253A%252F%252Fthenuel.com%252Fsignin-nuel%26scope%3Didentity%2520offline%26state%3DiNj9r1juVrmUK5DyLfXnjq6bM6Fci5E1seI-faOadJQsfBKC9PQJJA-wve3TrusBfhrcjNk8C932FDA_vgQIyrlg36K6ucoC3HZkAO-Yn-mRXmaVqZcdKPRvgwYr55UkeETK4ZsjyuOXNixzk0Z3AslC2ZVN2dqiqoPfpoYtz_n-xgtJlvN5WwRt6cEAvzSwhHkFX4UPUF_1OalC8J4aYO-FHfUjTp8Bv4xBe7w0j0exmjcsMIjpmnp4qbN3qz7u";
        request
        .get(url)
        .end(function(err, res) {
        	if (err) {
        		console.log(err);
        	} else {

        		// This is for getting the response headers from the GET page
                console.log("~~~GET~~~~~~~~~~~~~~~~~~~~~~~~")
                $ = cheerio.load(res.headers);

                console.log(res.headers);

                var secondRequestVToken = res.headers['set-cookie'][0]
                console.log("~~~Second RequestVerificationToken: " + secondRequestVToken);

                //  _gat=1;
                var firstARRAffinity = "_ga=GA1.2.613602222.1457217423; ARRAffinity=f02c8a40711ffa249ac8dcf17e82c47021b4939e86cdd8caa8a1729b4a81838d;"

                var secondARRAffinity = res.headers['set-cookie'][1]
                console.log("~~~Second ARRAfinnity: " + secondARRAffinity);


                // This is the getting of the post Request data from the login page
                console.log("~~~POST~~~~~~~~~~~~~~~~~~~~~~~~");
                $ = cheerio.load(res.text)

                var postUrl = "https://login.thenuel.com" + $('body > div > div > div.content-pane.login > form').attr("action");
                console.log("~~~URL POST: " + postUrl);

                var firstRequestVToken = $('body > div > div > div.content-pane.login > form > input[type="hidden"]:nth-child(1)').attr("value");
                console.log("~~~First POST RequestVerificationToken: " + firstRequestVToken);

                var formData= {
                    UserName:'on36@kent.ac.uk',
                    Password:'Archos83',
                    __RequestVerificationToken:firstRequestVToken
                }
                console.log(formData);

                console.log("~~~COOKIE STUFF~~~")
                secondRequestVToken = secondRequestVToken.slice(0, -7);
                console.log(secondRequestVToken);
                secondARRAffinity = secondARRAffinity.slice(0, -31)
                console.log(secondARRAffinity);

                var finalCookieString = firstARRAffinity + " "
                 + secondRequestVToken + " " + secondARRAffinity;

                console.log("~~~Final Cookie String: " + finalCookieString);


                request
                .post(postUrl)
                .send(formData)
                .set("Cookie", finalCookieString)
                .end(function(err, res) {
                    // Do respone here
                    if (err) {
                        console.log("~~~Hello failure world!");
                        console.log(err);
                    } else {
                        console.log("Hello success world!");
                        console.log(res);
                    }
                })

				// var jar = requestNew.jar();
				// var cookie = requestNew.cookie(finalCookieString);
				// jar.setCookie(cookie);
				// requestNew = requestNew.defaults({jar: true})

				// requestNew({
				// 	uri: postUrl,
				// 	method: "POST",
				// 	form: {
				// 		UserName:'on36@kent.ac.uk',
    //                 	Password:'Archos83',
    //                 	__RequestVerificationToken:firstRequestVToken
				// 	},
				// 	jar: jar
				// }, function(error, response, body) {
				// 	if (error != null) {
				// 		console.log("~~~ERROR")
				// 		console.log(error);
				// 	} else {
				// 		console.log("~~~SUCCESS")
				// 		console.log(response);
				// 	}
				// })
        	}
        })
});