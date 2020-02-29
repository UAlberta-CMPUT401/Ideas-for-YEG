var mongoose      = require('mongoose'),
	email_schema  = require("../models/Email");

var emailModelSchema = new mongoose.Schema({
	email_address: String,
	subject: String,
	body: String
});

module.exports = emailModelSchema;