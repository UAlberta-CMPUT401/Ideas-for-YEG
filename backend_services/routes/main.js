var express       = require("express"),
    router        = express.Router(),
    http 		  = require("request");
    mongoose      = require("mongoose"),
    email_schema  = require("../models/Email");

BASE_URL = 'http://localhost:1337/'
var db = mongoose.connection;
var Email = db.model('Email', email_schema, 'emails');

router.post("/email", function(request, response){
	request_body = request.body;
	try {
		if (request_body.email.trim() !== '') {
			Email.findOneAndUpdate({ email: request_body.email }, 
				{ $push: { 
	            	data: {
	              		'subject' : request_body.subject,
	               		'body' : request_body.body
	               	}  
	          	}
   			}, {new: true}, function(err, doc) {
				if (err) {
					response.status(500);
					response.send(err);
				} else {
					// Doesn't exist
					if (!doc) {
						var instance = new Email({email: request_body.email, data: [{subject : request_body.subject, body : request_body.body}]});
						instance.save(function (err) {
							if (err) {
								response.status(500);
								response.send(err);
							} else {
								response.status(200);
								response.send('Email digest created for : ' + request.body.email + '!');
							}
						});
					} else {
						response.status(200);
						response.send('Email appended to digest for : ' + request.body.email + '!');
					}
				}
   			});
	    } else {
	        response.status(403);
			response.send('None shall pass.');
	    }
		// request_url = BASE_URL + '?users.email=' + body['email'];
		// request(request_url, { json: true }, (err, res, body) => {
		// 	console.log(request_body);
		// 	if (err) {
		// 		throw err;
		// 	}
		// });
	} catch (err) {
		response.status(500);
		response.send(err);
	}
});

module.exports = router;