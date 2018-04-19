var mysql = require('mysql');

exports.insert = function(email, password, name) {

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

  con.query('INSERT INTO auth (email, password, name) VALUES ('+con.escape(email)+','+con.escape(password)+','+con.escape(name)+')' , function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
  });

};

exports.select = function(email, res, req, callback) {
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

  con.query('SELECT password FROM auth WHERE email = ' + con.escape(email) , function(err, result) {
    if (err) {
      console.log(err);
      return;
    };

    //console.log('Email1: ' + result[0]['email']);
  if(result[0] == undefined){
    console.log('Email not found');
    callback(result, res, req);

  } else {
    callback(result, res, req);
  }

  });
};
