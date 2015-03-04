var express = require('express')
    , load = require('express-load')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , passport = require('passport')
    , flash    = require('connect-flash')
    , mongoose = require('mongoose')
    , session = require('express-session')
    , app = express();

global.db = mongoose.connect('mongodb://localhost/blog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});


require('./config/passport')(passport);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('blog'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// required for passport
app.use(session({
  secret: 'appsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true,
    maxAge: new Date(Date.now() + 3600000)
  }
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(express.static(__dirname + '/public'));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);

require('./routes/login.js')(app, passport); 


app.listen(3000, function(){
  console.log("Blog no ar.");
});