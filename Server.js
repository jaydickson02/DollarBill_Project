var express = require('express');
var db = require('./DBQuery');
var app = express();

app.set('view engine', 'pug');
app.use(express.static('public'));

app.get('/user/:username', function(req, res){
  var username = req.params.username;
  res.render('index',{title:username, message:"Hello " + username });
});

app.route('/signin').get(function(req, res){
  res.render('signin');
});

app.route('/contact').get(function(req, res){
  res.render('contact');
})

app.route('/signup').get(function(req, res){
  res.render('signup');
  var email = req.query.email;
  var password = req.query.password;
  db.insert(email, password);
})

app.route('/').get(function(req, res){
  res.render('welcome');
});



var server = app.listen(3000,function() {
  console.log("Server Running at port 3000")
});
