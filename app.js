var express        = require('express'),
    app		   	   = express(),
    session        = require('express-session'),
    body_parser    = require('body-parser');

require('dotenv').config();
console.log(process.env);

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json());
app.use(express.static(__dirname));
app.use(express.static('public'));
app.set('view engine', 'ejs');

var index_routes = require('./routes/index.js');

app.use(index_routes);

//Stop server from crashing when uncaught exception is found.
process.on('uncaughtException', function (err) {
  console.error(err);
  console.log("Node NOT Exiting...");
});

app.listen(process.env.port, process.env.ip, function(){
    console.log("Server Started!");
});