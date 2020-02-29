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
			var instance = new Email({email_address: request_body.email_address, subject: request_body.subject, body: request_body.body });
			instance.save(function (err) {
				if (err) {
					throw 'Error writing to databse for : ' + request_body.email;
				} else {
					response.status(200);
					response.send('Email written to database for : ' + request.body.email + '!');
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