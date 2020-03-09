var mongoose      = require('mongoose'),
    sgMail        = require('@sendgrid/mail'),
    email_schema  = require("./models/Email");

BASE_URL = 'http://localhost:1337/'
var db = mongoose.connection;
var Email = db.model('Email', email_schema, 'emails');

module.exports.sendEmails = function (email_obj) {
	html = '<img src=\"https://www.webuildvalue.com/static/upload/jed/jeddah-tower.jpg\" style=\"display: block; margin-left: auto; margin-right: auto; width: 30%; margin-bottom: 100px\">\n'
    for (var j = 0; j < email_obj.data.length; j++) {
        subject = email_obj.data[j].subject;
        body = email_obj.data[j].body;
        html = html + '<hr><center><strong><h1>' + subject + '</h1></strong></center><p>' + body + '<p>'
    }
    const msg = {
      to: email_obj.email,
      from: 'no-reply@ideas4yeg.com',
      subject: 'Your Daily Ideas Digest',
      html: html,
    };
    sgMail
        .send(msg)
        .then((response) => {
            if (response) {
            }
        }, console.error);
    Email.remove({email : email_obj.email}, function(err) {
        if (err) {
            console.log(err);
        }
    });
}

module.exports.sendEmail = function (email_obj) {
	html = '<img src=\"https://www.webuildvalue.com/static/upload/jed/jeddah-tower.jpg\" style=\"display: block; margin-left: auto; margin-right: auto; width: 30%; margin-bottom: 100px\">\n'
    subject = email_obj.subject;
    body = email_obj.body;
    html = html + '<hr><center><strong><h1>' + subject + '</h1></strong></center><p>' + body + '<p>'
    
    const msg = {
      to: email_obj.email,
      from: 'no-reply@ideas4yeg.com',
      subject: 'Your Daily Ideas Digest',
      html: html,
    };
    sgMail
        .send(msg)
        .then((response) => {
            if (response) {
            }
        }, console.error);
}