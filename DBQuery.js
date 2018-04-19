var mysql = require('mysql');

exports.newUser = function(email, password, name) {

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "02jd.pass0706",
    database: "credentials"
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

  });

  con.query('INSERT INTO auth (email, password, name) VALUES ('+con.escape(email)+','+con.escape(password)+','+con.escape(name)+')' , function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
    console.log("Row Added Succesfully");
  });

};

exports.selectProfileWithEmail = function(email, res, req, callback) {
console.log(email);
  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "02jd.pass0706",
    database: 'credentials'
  });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

  });

  con.query('SELECT * FROM auth WHERE email = ' + con.escape(email) , function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
callback(result, res, req);


  });
};
