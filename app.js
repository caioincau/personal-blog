var express = require('express')
    , load = require('express-load')
    , bodyParser = require('body-parser')
    , cookieParser = require('cookie-parser')
    , mongoose = require('mongoose')
    , app = express();

global.db = mongoose.connect('mongodb://localhost/blog');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function (callback) {
  // yay!
});

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(cookieParser('blog'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

load('models')
    .then('controllers')
    .then('routes')
    .into(app);


app.listen(3000, function(){
  console.log("Blog no ar.");
});