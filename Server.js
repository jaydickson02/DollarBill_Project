var express = require('express');
var bodyParser = require('body-parser');
var db = require('./DBQuery');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/user/:username', function(req, res){
  var username = req.params.username;
  res.render('index',{title:username, message:"Hello " + username });
});

app.route('/signin')
  .get(function(req, res){
    res.render('signin');
  })
  .post(function(req, res){
    res.render('signin');
    var email = req.body.email;
    var password = req.body.password;
    var passwordtrue = db.select(email);
    console.log("password: " + password);
    console.log("Actual password: " + passwordtrue);
    if(password == passwordtrue){
    res.render('user', {h1:"Hello " + email})
  }
  })

app.route('/contact').get(function(req, res){
  res.render('contact');
})

app.route('/signup')

  .get(function(req, res){
    res.render('signup');
  })

  .post(function(req, res){
    res.render('signup');
    var email = req.body.email;
    var password = req.body.password;
    db.insert(email, password);
  })

app.route('/')
.get(function(req, res){
  res.render('welcome');
});



var server = app.listen(3000,function() {
  console.log("Server Running at port 3000")
});
