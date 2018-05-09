var express = require('express');
var bodyParser = require('body-parser');
var db = require('./Modules/DBQuery');
var session = require('express-session');
var bcrypt = require('bcrypt');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(session({
  secret: "I think i see a rainbow, or is it a waterarch?"
}));


app.route('/user')

  .get(function(req, res) {
    if (!req.session.user) {
      res.redirect('/signin');
    } else {

      db.GetContent(req.session.user.id, function(result) {
        res.render('user', {
          "array": result,
          name: req.session.user.name
        });
      })
    }
  })

  .post(function(req, res) {
    db.newContent(req.session.user.id, req.body.content, req.body.date);

    db.GetContent(req.session.user.id, function(result) {
      res.render('user', {
        "array": result,
        "name": req.session.user.name
      });
    })
  });

app.route('/signin')

  .get(function(req, res) {

    if (req.session.user) {
      res.redirect('/user');
    } else {
      res.render('signin');
    }
  })

  .post(function(req, res) {
      var email = req.body.email;

      db.selectProfileWithEmail(email, res, req, function(result, res, req) {

          if (!result[0]) {
            console.log("Email not in database. Redirecting to Signup page")
            res.redirect('/signup');

          } else {

            bcrypt.compare(req.body.password, result[0]['password'], function(err, resp) {

              if (resp) {

                console.log("Assigning Session")

                req.session.user = {
                  id: result[0]['ID'],
                  name: result[0]['name']
                };

                res.redirect('/user');

              } else {

                res.render('signin');
              }
            });
          }

      })
})
    app.route('/contact').get(function(req, res) {
      res.render('contact');
    })

    app.route('/signup')

    .get(function(req, res) {
      res.render('signup');
    })

    .post(function(req, res) {
      var email = req.body.email;
      var password = req.body.password;
      var name = req.body.name;
      bcrypt.hash(password, 10, function(err, hash) {
        db.newUser(email, hash, name);
      });

      res.redirect('/signin');
    })

    app.get('/logout', function(req, res) {
      req.session.destroy();
      res.redirect('/signin');
    })

    app.route('/')

    .get(function(req, res) {
      res.render('welcome');
    })


    var server = app.listen(3000, function() {
      console.log("Server Running at port 80")
    });
