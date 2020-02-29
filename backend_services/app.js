var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    cron          = require('cron'),
    session       = require('express-session');
    mongoose      = require('mongoose'),
    sgMail        = require('@sendgrid/mail');
    email_schema  = require("./models/Email");

//Configurations---------------------------------------------------------->>>>>>
//***
//Set up default mongoose connection
require('dotenv').config();
console.log(process.env);

var mongoDB = 'mongodb://' + process.env.mongousername + ':' + process.env.mongopassword + '@' + process.env.mongohost + ':' + process.env.mongoport + '/ideas4';
console.log('\n' + mongoDB + '\n');
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up sendgrid
sgMail.setApiKey(process.env.sendgridapikey);

// Boilerplate
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
sess = session({
    cookieName: 'session',
    secret: "Secret L",
    resave: false,
    saveUninitialized: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    secure : true
});
if (process.env.server === 'production') {
    // Use secure cookies in production (requires SSL/TLS)
    // sess.cookie.secure = true;

    // Uncomment if your application is behind a proxy
    // or if you're encountering the error message:
    // "Unable to verify authorization request state"
    // app.set('trust proxy', 1);
}
app.use(sess);

//Routes------------------------------------------------------------------>>>>>>
var routes = require("./routes/main");
app.use(routes);

//Digest Jobs------------------------------------------------------------------>>>>>>
var Email = db.model('Email', email_schema, 'emails');
function startDigestJob() {
    var CronJob = cron.CronJob;
    var job = new CronJob('0 8 * * * *', function() {
        Email.find({}, function (err, emails) {
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < emails.length; i++) {
                    // Sendgrid
                    html = '<img src=\"https://www.webuildvalue.com/static/upload/jed/jeddah-tower.jpg\" style=\"display: block; margin-left: auto; margin-right: auto; width: 30%; margin-bottom: 100px\">\n'
                    for (var j = 0; j < emails[i].data.length; j++) {
                        subject = emails[i].data[j].subject;
                        body = emails[i].data[j].body;
                        html = html + '<hr><center><strong><h1>' + subject + '</h1></strong></center><p>' + body + '<p>'
                    }
                    const msg = {
                      to: emails[i].email,
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
            }
        });
    }, null, true, 'America/Denver');
    job.start();
}
startDigestJob();

//Stop server from crashing when uncaught exception is found.
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Stripe and Email Server NOT Exiting...");
});

app.listen(1311, 'localhost', function(){
    console.log("\nStripe and Email Server Started!\n");
});