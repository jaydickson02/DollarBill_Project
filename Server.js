var express = require('express');
var bodyParser = require('body-parser');
var db = require('./DBQuery');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.set('view engine', 'pug');
app.use(express.static('public'));


app.route('/user/:username')

.get(function(req, res){
  var username = req.params.username;

  var bills = ['FOOD!', 'gas payment', 'phone Bill'];
  var dates = ['10/3/19', '13/1/3', '16/13/16'];

  res.render('user', {billsL:bills, datesL:dates, h1: username});
})

  .post(function(req, res) {
    console.log('Hello');
  })

app.route('/signin')
  .get(function(req, res){
    res.render('signin');
  })
  .post(function(req, res){
    var email = req.body.email;

    db.selectProfileWithEmail(email, res, req, function(result, res, req){
      var password = req.body.password;

      if(result[0] == undefined){
        console.log("Email not in database. Redirecting to Signup page")
        res.redirect('signup');

      } else if(password == result[0]['password']){
        console.log("Profile Found!");
        res.render('/user/' + result[0][id]);

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
    res.redirect('signin');
  })

app.route('/')

.get(function(req, res){
  res.render('welcome');
})


var server = app.listen(3000,function() {
  console.log("Server Running at port 80")
});
