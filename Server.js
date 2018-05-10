var bodyParser = require('body-parser');
var session = require('express-session');
var bcrypt = require('bcrypt');
var db = require('./Modules/DBQuery');
var express = require('express');
var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies
app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(session({secret: "I think i see a rainbow, or is it a waterarch?"}));

//---------Landing Page---------
app.get('/', function(req, res) {

  res.render('welcome');

});

//---------Displays contact page---------
app.get('/contact',function(req, res) {

  res.render('contact');

});

//---------Logs out the user---------
app.get('/logout', function(req, res) {

  //Deletes the users session and redirects to sign in page
  req.session.destroy();
  res.redirect('/signin');

});

//---------Sign in Page---------
app.route('/signin')

  //Displays the sign in page in users browser
  .get(function(req, res) {

    //checks if the user is already signed in. If they are skip sign in
    if (req.session.user) {

      res.redirect('/user');

    //If user isn't signed in show sign in page
    } else {

      res.render('signin');

    }
  })

  //Accepts the users email and password
  .post(function(req, res) {

    var email = req.body.email;

    //Looks up email in database and gets users information
    db.selectProfileWithEmail(email, res, req, function(result, res, req) {

      //Checks if email is in the database
      if (!result[0]) {

        console.log("Email not in database. Redirecting to Signup page")
        res.redirect('/signup');

      } else {

        //Compares the password hashes to validate the password
        bcrypt.compare(req.body.password, result[0]['password'], function(err, resp) {

          //Password is correct. Assign session and move user to dashboard/user page
          if (resp) {

            req.session.user = {

              id: result[0]['ID'],
              name: result[0]['name']

            };

            res.redirect('/user');

          //Password is incorrect. Retry sign in.
          } else {

            res.render('signin');
          }
        });
      }
    });
})

//---------Sign Up Page---------
app.route('/signup')

  //Displays the Sign Up page
  .get(function(req, res) {

    res.render('signup');

  })

  //Recieves name, email and password from the user
  .post(function(req, res) {

    var email = req.body.email;
    var password = req.body.password;
    var name = req.body.name;

    //Password is hashed and salted for security
    bcrypt.hash(password, 10, function(err, hash) {

      //User is added to database
      db.newUser(email, hash, name);

    });

    //User is taken to Sign In page
    //Change to Auto Login instead of this:
    res.redirect('/signin');

  })

//---------User Page---------
app.route('/user')

  //Displays the User Page
  .get(function(req, res) {

    //Checks to see if user is logged in. If not redirects to Sign In.
    if (!req.session.user) {

      res.redirect('/signin');

    } else {

      //If user is signed in, Load content from database on the page
      db.GetContent(req.session.user.id, function(result) {

        res.render('user', {"array": result, name: req.session.user.name});

      });
    }
  })

  //Adds and removes content from the page and database
  .post(function(req, res) {

    //Checks if the user is adding content
    if (req.body.content && req.body.date) {

      //Adds content to database
      db.newContent(req.session.user.id, req.body.content, req.body.date);

    //Checks if the user is removing content
    } else if (req.body.contentID) {

      //Removes content from database
      db.RemoveContent(req.session.user.id, req.body.contentID);

    }

    //Refreshes page content
    db.GetContent(req.session.user.id, function(result) {

      res.render('user', {"array": result, "name": req.session.user.name});

    });
  })

//Server listens for incoming requests
var server = app.listen(3000, function() {

  console.log("Server Running at port 80")

});
