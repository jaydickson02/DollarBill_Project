var express = require('express');
var app = express();
app.set('view engine','pug');

app.get('/user/:username', function(req,res){
  var username = req.params.username;
  res.render('index',{title:username, message:"Hello " + username });
});

app.route('/signIn').get(function(req, res){
  res.render('index',{title:"Sign In", message:"Sign in below"});
})

app.route('/').get(function(req,res){
  res.render('index', {title:"Welcome", message:"Welcome to DollarBills"});
});


var server=app.listen(3000,function() {});
