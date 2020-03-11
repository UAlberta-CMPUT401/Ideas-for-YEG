var express       = require("express"),
    router        = express.Router(),
    request_mod   = require("request"),
    mongoose      = require("mongoose"),
    path 		  = require("path"),
    sgMail        = require('@sendgrid/mail'),
    email_schema  = require("../models/Email"),
    EmailHelper   = require("../helpers/emailHelper");

const BASE_URL = 'http://localhost:1337/';
var db = mongoose.connection;
var Email = db.model('Email', email_schema, 'emails');
const DONATORS = 'donators';
const VOLUNTEERS = 'volunteers';
const FOLLOWERS = 'followers';

router.post("/email/:id", function(request, response){
	const request_body = request.body;
	const idea_id = request.params.id;
	const url = BASE_URL + 'ideas?id=' + idea_id;
	var emails = [];
	request_mod(url, function (error, request_resp, body) {
		if (error) {
			if (request_resp && request_resp.statusCode) {
				response.status(request_resp.statusCode);
			} else {
				response.status(500);
			}
			return response.send('Error getting list of emails.');
		} else {
			if (request_resp && request_resp.statusCode === 200) {
				body = JSON.parse(body)[0];
				emails = parseEmailJson(body, request_body['user_group']);
				response.status(200);
				response.send('Sucessfully retrieved emails from ideas. Sending emails.');
				if (request_body['user_group'] === DONATORS || request_body['user_group'] === VOLUNTEERS) {
					emails.forEach(function(email) {
						if (email.trim() !== '') {
							const email_obj = {email : email, subject : request_body['subject'], body : request_body['body']}
							EmailHelper.sendEmail(email_obj);
						}
					});
				} else if (request_body['user_group'] === FOLLOWERS) {
					emails.forEach(function(email) {
						try {
							if (email.email.trim() !== '') {
								Email.findOneAndUpdate({ email: email.email }, 
									{ $push: { 
						            	data: {
						              		'subject' : request_body.subject,
						               		'body' : request_body.body
						               	}  
						          	}
					   			}, {new: true}, function(err, doc) {
									if (err) {
										console.log('Status Code 500: ' + err);
									} else {
										if (!doc) {
											const email_frequency = email.email_frequency == null ? 'weekly' : email.email_frequency;
											var instance = new Email({email: email.email, email_frequency : email_frequency, data: [{subject : request_body.subject, body : request_body.body}]});
											instance.save(function (err) {
												if (err) {
													console.log(err);
												} else {
													console.log('Email digest created for : ' + email.email + '!');
												}
											});
										} else {
											console.log('Email digest created for : ' + email.email + '!');
										}
									}
					   			});
							}
						} catch (err) {
							console.log('Status Code 500: ' + err);
						}
					});	
				}
			} else {
				response.status(request_resp.statusCode);
				return response.send('Bad response from strapi.');
			}
		}
	});
});

function parseEmailJson(body, user_group) {
	var emails = [];
	try {
		if (user_group === DONATORS) {
			body['donation'].forEach(function(user) {
				if (typeof user['user']['email'] != 'undefined') {
					emails.push(user['user']['email']);
				}
			});
		} else if (user_group === VOLUNTEERS) {
			body[user_group].forEach(function(user) {
				if (typeof user['email'] != 'undefined') {
					emails.push(user['email']);
				}
			});
		} else if (user_group === DONATORS) {
			body[user_group].forEach(function(user) {
				if (typeof user['email'] != 'undefined') {
					// TODO : No longer an array of emails but an array of json objects with email + email_frequencies. Maybe get this from 
					// the /users route instead. (Currently we are unauthorized 403).
					emails.push({email : user['email'], email_frequency : user['email_frequency']});
				}
			});
		}
	} catch (err) {
		console.log(err);
	}
	return emails;
}

module.exports = router;
