var express         = require("express"),
    router          = express.Router(),
    http 		    = require("request"),
    axios			= require("axios");

// TODO : Uncomment these. We still want to use test credit cards in production until we're 100% ready
// const key = process.env.NODE_ENV === 'production' ? process.env.stripeKey : process.env.stripeTestKey;
// const secret_key = process.env.NODE_ENV === 'production' ? process.env.stripeSecretKey : process.env.stripeTestSecretKey;
const key = process.env.stripeTestKey;
const secret_key = process.env.stripeTestSecretKey;
var stripe = require('stripe')(secret_key);

FRONTEND_URL = process.env.NODE_ENV === 'production' ? process.env.prodfrontendurl : process.env.devfrontendurl;
BACKENDSERVICES_URL = process.env.NODE_ENV === 'production' ? process.env.prodbackendservices_url : process.env.backendservices_url;
BASE_URL = process.env.strapi_base_url;

router.get('/donate', function(request, response){
	if (typeof request.query.iid === 'undefined' || request.query.iid.trim === '') {
		response.render('../views/donation_alternate', {frontend_url : FRONTEND_URL, error : 'No idea provided! Please return to your dashboard below and retry again.'});
	} else {
		response.render('../views/donation', {frontend_url : FRONTEND_URL, iid : request.query.iid});
	}
});

router.post('/donate', function(request, response){
	var user;
	var jwt;
	const email = request.body.email;
	const amt = request.body.amt;
	const iid = request.body.iid;
	http.get({url: BASE_URL + '/ideas/' + iid}, function(err, iid_response, iid_body){
		iid_body = JSON.parse(iid_body);
		var title = '';
		if (iid_response && iid_response.statusCode == 200) {
			title = iid_body.title;
			http.post({url: BASE_URL + '/auth/local', form: {identifier: process.env.superuser, password: process.env.superuserpassword}}, function(err, auth_response, auth_body){
				if (auth_response && auth_response.statusCode == 200) {
					auth_body = JSON.parse(auth_body);
		    		jwt = auth_body.jwt;
		    		var options = {
					    method: 'GET',
					    url: BASE_URL + '/users?email=' + email,
					    headers: {
					        'Authorization': 'Bearer ' + jwt,
					        'Content-Type': 'application/json'
					    },
					    json: true
				  	};
		    		axios(options).then(function(axios_response){
		    			if (axios_response.data.length != 0) {
		    				if (axios_response.data[0].email === email) {
		    					(async () => {
							    	const session = await stripe.checkout.sessions.create({
							    		line_items: [
										    {
												amount : amt * 100,
												currency: 'cad',
												name: title,
												quantity : 1
										    }
										],
										payment_method_types: ['card'],
										mode : 'payment',
										submit_type: 'donate',
										success_url: BACKENDSERVICES_URL + '/pay_success?uid=' + axios_response.data[0].id + '&iid=' + iid + '&amt=' + amt,
										cancel_url: BACKENDSERVICES_URL + '/donate',
									});
									response.render('../views/checkout', {pkey : key, checkout_session_id : session.id});
								})();
		    				}
			    		} else {
			    			request.flash('error', 'Email does not exist!');
							response.status(403);
							response.redirect('/donate');
			    		}
				    }).catch(function(error){
				    	request.flash('error', 'An error occured');
						response.status(response.status);
						response.redirect('/donate');
				    });
				} else {
					request.flash('error', 'An error occured');
					response.status(auth_response.statusCode);
					response.redirect('/donate');
				}
			});
		} else {
			request.flash('error', 'An error occured. Couldn\'t find idea');
			response.status(iid_response.statusCode);
			response.redirect('/donate');
		}
	});
});

router.get('/pay_success', function (request, response) {
	const iid = request.query.iid;
	const amt = request.query.amt;
	const uid = request.query.uid;
	if (typeof iid !== 'undefined' && typeof amt !== 'undefined' && typeof uid !== 'undefined') {
		http.post({url: BASE_URL + '/auth/local', form: {identifier: process.env.superuser, password: process.env.superuserpassword}}, function(err, auth_response, auth_body){
			if (auth_response && auth_response.statusCode == 200) {
				auth_body = JSON.parse(auth_body);
	    		jwt = auth_body.jwt;
	    		var options = {
				    method: 'GET',
				    url: BASE_URL + '/ideas/' + iid,
				    headers: {
				        'Authorization': 'Bearer ' + jwt,
				        'Content-Type': 'application/json'
				    },
				    json: true
			  	};
	    		axios(options).then(function(axios_idea_response){
	    			if (axios_idea_response.data.length != 0) {
    					const options2 = {
						    method: 'GET',
						    url: BASE_URL + '/users/' + uid,
						    headers: {
						        'Authorization': 'Bearer ' + jwt,
						        'Content-Type': 'application/json'
						    },
						    json: true
			  			};
			  			axios(options2).then(function(axios_user_response){
			    			if (axios_user_response.data.length != 0) {
			    				var idea = axios_idea_response.data;
							if (typeof idea.donation === 'undefined'){
			    					const donation = [{
			    						user : axios_user_response.data,
			    						amount : Number(amt)
			    					}];
			    					idea.donation = donation;
			    				} else {
			    					const donation = {
			    						user : axios_user_response.data,
			    						amount : Number(amt)
			    					};
			    					idea.donation.push(donation);
			    				}
			    				const options3 = {
								    method: 'PUT',
								    url: BASE_URL + '/ideas/' + iid,
								    data : idea,
								    headers: {
								        'Authorization': 'Bearer ' + jwt,
								        'Content-Type': 'application/json'
								    },
								    json: true
					  			};
					  			axios(options3).then(function(axios_put_response){
					    			if (axios_put_response.status == 200) {
										response.render('../views/donation_alternate', {frontend_url : FRONTEND_URL, success : 'Your payment succeeded! Thank you!'});
				    				} else {
				    					console.log('Put request not 200');
				    					console.log(axios_put_response)
				    					console.log(axios_put_response.error);
	    								error_redirect(request, response);
				    				}
				    			}).catch(function(error) {
					  				console.log('Put request not 200');
    								error_redirect(request, response);
					  			});
			    			} else {
			    				console.log('User response empty');
		    					error_redirect(request, response);
			    			}
			    		});
		    		} else {
		    			console.log('Idea response empty');
		    			error_redirect(request, response);
		    		}
			    }).catch(function(error){
			    	console.log('Axios error: ' + error);
			    	error_redirect(request, response);
			    });
			} else {
				console.log('Auth response was not 200');
				error_redirect(request, response);
			}
		});
	} else {
		console.log('URL was tampered with.');
		error_redirect(request, response);
	}
});

function error_redirect(request, response) {
    response.render('../views/donation_alternate', {frontend_url : FRONTEND_URL, error : 'Your payment succeeded but we had issues updating the idea with your donation.'});
}

module.exports = router;
