var mysql = require('mysql');

exports.insert = function(email, password) {

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

  con.query('INSERT INTO auth (email, password) VALUES ('+con.escape(email)+','+con.escape(password)+')' , function(err, result) {
    if (err) {
      console.log(err);
      return;
    };

    console.log('Sql: ' + result);
  });

};

exports.select = function(email) {
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
    return('Not Found');

  } else {
    console.log(result[0]['password']);
    return(result[0]['password']);
  }

  });
};
