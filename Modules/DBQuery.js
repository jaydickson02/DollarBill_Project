var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "dollarbillsmysql1357jz", //Put in seperate file that isnt on GitHub. Security Flaw!
  database: "credentials"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");

});

exports.newUser = function(email, password, name) {
  con.query('INSERT INTO users (email, password, name) VALUES (' + con.escape(email) + ',' + con.escape(password) + ',' + con.escape(name) + ')', function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
    console.log("New User Added Succesfully");
  });

};

exports.selectProfileWithEmail = function(email, res, req, callback) {
  con.query('SELECT * FROM users WHERE email = ' + con.escape(email), function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
    callback(result, res, req);


  });
};


exports.newContent = function(userid, content, date) {
  con.query('INSERT INTO content (id, listing, date) VALUES (' + con.escape(userid) + ',' + con.escape(content) + ',' + con.escape(date) + ')', function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
    console.log("New Content Added Succesfully");
  });

};

exports.GetContent = function(userid, callback) {
  con.query('SELECT * FROM content WHERE id = ' + con.escape(userid), function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
    callback(result)
  });
};

exports.RemoveContent = function(userid, contentID) { //Do with a id
  con.query('DELETE FROM content WHERE contentID = ' + con.escape(contentID) + ' AND id = ' + con.escape(userid), function(err, result) {
    if (err) {
      console.log(err);
      return;
    };
    console.log("Removed Content Succesfully");
  });
};
