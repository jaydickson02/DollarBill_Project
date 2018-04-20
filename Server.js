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

    db.selectProfileWithEmail(email, res, req, function(result, res, req){
      var password = req.body.password;
      if(result[0] == undefined){

        res.render('signin');

      } else if(password == result[0]['password']){
        console.log("Profile Found!");
        res.render('user', {h1:"Hello " + result[0]['name']});

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
    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;
    db.newUser(email, password, name);
    res.render('signin');
  })

app.route('/')
.get(function(req, res){
  res.render('welcome');
});
var bills = ['FOOD!', 'gas payment', 'phone Bill'];
var dates = ['10/3/19', '13/1/3', '16/13/16'];

app.route('/users').get(function(req, res){
  res.render('user', {billsL:bills, datesL:dates});
})


var server = app.listen(3000,function() {
  console.log("Server Running at port 80")
});
