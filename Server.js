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
    var email = req.body.email;

    db.select(email, res, req, function(result, res, req){
      var password = req.body.password;

      if(result[0] == undefined){

        res.render('signin');

      } else if(password == result[0]['password']){

        res.render('user', {h1:"Hello " + email});

      } else {

      res.render('signin');

    }
  })


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
