var express       = require("express"),
    session       = require('express-session'),
    app           = express(),
    bodyParser    = require("body-parser"),
    cron          = require('cron'),
    request       = require("request"),
    mongoose      = require('mongoose'),
    sgMail        = require('@sendgrid/mail'),
    cors          = require('cors'),
    flash         = require("connect-flash"),
    email_schema  = require("./models/Email"),
    EmailHelper   = require("./helpers/emailHelper");

//Configurations---------------------------------------------------------->>>>>>
//***
//Set up default mongoose connection
require('dotenv').config();

var mongoDB = '';
if (process.env.NODE_ENV != 'production'){
    mongoDB = 'mongodb://' + process.env.mongousername + ':' + process.env.mongopassword + '@' + process.env.mongohost + ':' + process.env.mongoport + '/ideas4';
} else {
    mongoDB = 'mongodb://' + process.env.mongohost + ':' + process.env.mongoport + '/strapi';
}
console.log('\n' + mongoDB + '\n');
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//Set up sendgrid
sgMail.setApiKey(process.env.sendgridapikey);

// Boilerplate
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname));
app.use(express.static("public"));
app.use(flash());
app.set("view engine", "ejs");
sess = session({
    cookieName: 'session',
    secret: "Secret L",
    resave: false,
    saveUninitialized: false,
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
    secure : true
});
if (process.env.NODE_ENV === 'production') {
    // Use secure cookies in production (requires SSL/TLS)
    // sess.cookie.secure = true;

    // Uncomment the line below if your application is behind a proxy
    // or if you're encountering the error message:
    // "Unable to verify authorization request state"
    // app.set('trust proxy', 1);
}
app.use(sess);

app.use(function(request, response, next){
    //Inside ejs templates
    response.locals.error = request.flash("error");
    response.locals.success = request.flash("success");
    next();
});

//Routes------------------------------------------------------------------>>>>>>
var email   = require("./routes/email"),
    payment = require("./routes/payment");

app.use(email);
app.use(payment);

//Digest Jobs------------------------------------------------------------------>>>>>>
var Email = db.model('Email', email_schema, 'emails');
const BASE_URL = process.env.strapi_base_url;
function startDigestJob() {
    var CronJob = cron.CronJob;
    var job = new CronJob('0 8 * * * *', function() {
        Email.find({}, function (err, emails) {
            if (err) {
                console.log(err);
            } else {
                for (var i = 0; i < emails.length; i++) {
                    // Check if it is Monday. If it isn't ensure that the user is only daily digest frequency, otherwise do not send it.
                    var date = new Date();
                    var weekday = date.getDay();
                    if (weekday !== 0) {
                        if (emails[i]['email_frequency'] !== 'daily') {
                            continue;
                        } else {
                            EmailHelper.sendEmails(emails[i]);
                        }        
                    } else {
                        EmailHelper.sendEmails(emails[i]);
                    }
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

if (process.env.NODE_ENV != 'production'){
  app.listen(1311, 'localhost', function(){
      console.log("\nStripe and Email Server Started On Dev!\n");
  });
} else {
  app.listen(1311, process.env.IP, function(){
      console.log("\nStripe and Email Server Started On Prod!\n");
  });
}
