var express       = require("express"),
    router        = express.Router(),
    http 		  = require("request");
    mongoose      = require("mongoose"),
    email_schema  = require("../models/Email");

BASE_URL = 'http://localhost:1337/'
var db = mongoose.connection;
var Email = db.model('Email', email_schema, 'emails');

router.post("/donate", function(request, response){
	var key = ''
	if (process.env.NODE_ENV !== 'production') {
		key = process.env.stripetestapikey;
	} else {
		key = process.env.stripeapikey;
	}
	const stripe = require("stripe")(key);
	request_body = request.body;
	try {
		if (request_body.email.trim() !== '') {

		} else {
			response.status(400);
			response.send('Email is blank');
		}
	} catch (err) {
		response.status(500);
		response.send(err);
	}
});

module.exports = router;