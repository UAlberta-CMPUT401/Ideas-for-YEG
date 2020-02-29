var express       = require("express"),
    app           = express(),
    bodyParser    = require("body-parser"),
    session       = require('express-session');
    mongoose      = require('mongoose');

//Configurations---------------------------------------------------------->>>>>>
//***
//Set up default mongoose connection
require('dotenv').config();
console.log(process.env);

var mongoDB = 'mongodb://' + process.env.mongousername + ':' + process.env.mongopassword + '@' + process.env.mongohost + ':' + process.env.mongoport + '/ideas4';
console.log(mongoDB);
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

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
// var Email = db.model('Email', email_schema);
function sendDigest() {

}

//Stop server from crashing when uncaught exception is found.
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Stripe and Email Server NOT Exiting...");
});

app.listen(1311, 'localhost', function(){
    console.log("\nStripe and Email Server Started!\n");
});