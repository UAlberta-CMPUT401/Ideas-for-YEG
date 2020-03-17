var express         = require("express"),
    router          = express.Router(),
    http 		    = require("request");

const key = process.env.NODE_ENV === 'production' ? process.env.stripeKey : process.env.stripeTestKey;
const secret_key = process.env.NODE_ENV === 'production' ? process.env.stripeSecretKey : process.env.stripeTestSecretKey;
var stripe = require('stripe')(secret_key);

const frontend_url = process.env.NODE_ENV === 'production' ? process.env.prodfrontendurl : process.env.devfrontendurl;
BASE_URL = process.env.strapi_base_url;

router.get('/donate', function(request, response){
	response.render('../views/donation', {frontend_url : frontend_url});
});

router.post('/donate', function(request, response){
	var user;
	var jwt;
	const email = request.body.email;
	http.post({url: BASE_URL + '/auth/local', form: {identifier: 'backend_services', password: '12345678a'}}, function(err, httpResponse, body){
		if (httpResponse && httpResponse.statusCode == 200) {
    		jwt = body.jwt;
    		console.log(BASE_URL + '/users');
    		const options = {
				url: BASE_URL + '/users',
			 	headers: {
			   		headers: {
			     		Authorization: 'Bearer ' + jwt,
			    	},
			  	}
			};
			is_match = http.get(options, function(err2, httpResponse2, body2){
				if (httpResponse && httpResponse.statusCode == 200) {
					console.log(body2);
		    		if (body2.email === email) {
		    			
		    		} else {
		    			request.flash('error', 'Email does not exist!');
						response.status(403);
						response.redirect('/donate');
		    		}
				} else {
					console.log('nuhhh');
					console.log(err);
					request.flash('error', 'An error occured');
					response.status(httpResponse2.statusCode);
					response.redirect('/donate');
				}
			});
		} else {
			request.flash('error', 'An error occured');
			response.status(httpResponse.statusCode);
			response.redirect('/donate');
		}
	});
});

module.exports = router;