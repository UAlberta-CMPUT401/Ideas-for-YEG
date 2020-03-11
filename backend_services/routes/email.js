var express       = require("express"),
    router        = express.Router(),
    request  	  = require("request"),
    mongoose      = require("mongoose"),
    path 		  = require("path"),
    sgMail        = require('@sendgrid/mail'),
    email_schema  = require("../models/Email"),
    EmailHelper   = require("../helpers/emailHelper");

BASE_URL = 'http://localhost:1337/'
var db = mongoose.connection;
var Email = db.model('Email', email_schema, 'emails');

router.post("/email/:id", function(request, response){
	const request_body = request.body;
	const idea_id = request.params.id;
	const url = path.join(BASE_URL, '/ideas?id=', idea_id);
	var emails = [];
	console.log(idea_id);
	console.log(url);
	request(path.join(BASE_URL, '/ideas?id=', idea_id), function (error, response, body) {
		if (error) {
			if (response && response.statusCode) {
				response.status(response.statusCode);
			} else {
				response.status(500);
			}
			return response.send(error);
		} else {
			if (response && response.statusCode === 200) {
				emails = parseEmailJson(body, request_body['user_group']);
				reponse.status(200);
				response.send('Sucessfully retrieved emails from ideas. Sending emails.');
				// Asynchronous loop. Since it's a big job we should not keep the frontend waiting.
				// Donators and volunteers get emails immediately
				if (request_body['user_group'] === 'donators' || request_body['user_group'] === 'volunteers') {
					const email_obj = {email : request_body['email'], subject : request_body['subject'], body : request_body['body']}
					Emailhelper.sendEmail(email_obj);
				// Followers
				} else if (request_body['user_group'] === 'followers') {
					emails.forEach(function(email) {
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
										// response.status(500);
										// response.send(err);
										console.log('Status Code 500: ' + err);
									} else {
										// Doesn't exist
										if (!doc) {
											var instance = new Email({email: request_body.email, data: [{subject : request_body.subject, body : request_body.body}]});
											instance.save(function (err) {
												if (err) {
													// response.status(500);
													// response.send(err);
													console.log(err);
												} else {
													// response.status(200);
													// response.send('Email digest created for : ' + request.body.email + '!');
													console.log('Email digest created for : ' + request.body.email + '!');
												}
											});
										} else {
											// response.status(200);
											// response.send('Email appended to digest for : ' + request.body.email + '!');
											console.log('Email digest created for : ' + request.body.email + '!');
										}
									}
					   			});
							}
						} catch (err) {
							// response.status(500);
							// response.send(err);
							console.log('Status Code 500: ' + err);
						}
					});	
				}
			} else {
				response.status(response.statusCode);
				return response.send('No response from strapi.');
			}
		}
	});
});

function parseEmailJson(body, user_group) {
	var emails = [];
	try {
		if (user_group === 'donators') {
			body['Donation'].forEach(function(user) {
				if (typeof user['user']['email'] != 'undefined') {
					emails.push(user[email]);
				}
			});
		} else {
			body[user_group].forEach(function(user) {
				if (typeof user['email'] != 'undefined') {
					emails.push(user[email]);
				}
			});
		}
	} catch (err) {
		console.log(err);
	}
	return emails;
}

module.exports = router;
