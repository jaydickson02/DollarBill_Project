var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dollarbillsmysql1357jz",
  database: "credentials"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

});

exports.newUser = function(email, password, name) {

  con.query('INSERT INTO users (email, password, name) VALUES ('+con.escape(email)+','+con.escape(password)+','+con.escape(name)+')' , function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
    console.log("Row Added Succesfully");
  });

};


exports.newContent = function(userid, content, date) {

  con.query('INSERT INTO contents (id, content, date) VALUES ('+con.escape(userid)+','+con.escape(content)+','+con.escape(date)+')' , function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
    console.log("Row Added Succesfully");
  });

};

exports.selectProfileWithEmail = function(email, res, req, callback) {
console.log(email);

  con.query('SELECT * FROM users WHERE email = ' + con.escape(email) , function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
  callback(result, res, req);


  });
};
