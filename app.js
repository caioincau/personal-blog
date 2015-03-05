var express = require('express')
    , load = require('express-load')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , passport = require('passport')
    , flash    = require('connect-flash')
    , mongoose = require('mongoose')
    , session = require('express-session')
    , app = express();


load('models')
    .into(app);
require('./config/passport')(passport);


app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('1234567890QWERT'));
app.use(bodyParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// required for passport
app.use(session({
    secret: '1234567890QWERT',
    cookie: {maxAge: 24*60*60*1000}
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(__dirname + '/public'));

load('controllers')
    .into(app);

require('./routes/login.js')(app, passport); 
require('./routes/home.js')(app);



app.listen(3030, function(){
  console.log("Blog no ar.");
});