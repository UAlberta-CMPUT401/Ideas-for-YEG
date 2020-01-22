var express        = require('express'),
    app		   = express(),
    body_parser    = require('body-parser'),
    session        = require('express-session);

require('dotenv').config();
console.log(process.env);

app.use(body_parser.urlencoded({extended:true}));
app.use(body_parser.json);
app.use(express.static('public'));

var index_routes = require('./routes/index.js);

app.use(index_routes);

app.listen(process.env.PORT, process.env.IP, function()){
    console.log('Server started!');
});
