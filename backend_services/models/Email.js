var mongoose      = require('mongoose'),
	email_schema  = require("../models/Email");

var emailModelSchema = new mongoose.Schema({
	email: String,
	data: [{subject : String, body : String}]
});

module.exports = emailModelSchema;