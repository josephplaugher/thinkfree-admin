const bcrypt = require("bcryptjs");
const db = require("../util/postgres");
const log = require("../util/Logger");
const Conn = db.Conn;

function Login(req, res) {
  this.inputs = req.body;
  this.res = res;
}

Login.prototype.login = function() {
  const query = {
    text: `SELECT email, password, admin 
      FROM users WHERE email = $1 AND admin = 'true' `,
    values: [this.inputs.email]
  };
  Conn.query(query)
    .catch(e => {
      log(e, "Login.js");
    })
    .then(data => {
      this.checkPassword(data);
    });
};

Login.prototype.checkPassword = function(data) {
  if (data.rows[0]) {
    //if the email resulted in a user entry, compare password hashes
    var dbhash = data.rows[0].password;
    //if the password was hashed in PHP it will contain a '$2y$' hash.
    //if hashed in Node, it will contain a '$2a$a' hash.
    //if the former, we replace it before verifying.
    if (dbhash.includes("$2y$")) {
      dbhash = dbhash.replace(/^\$2y(.+)$/i, "$2a$1");
    }
    //compaare the hashes
    bcrypt.compare(this.inputs.password, dbhash, (error, result) => {
      if (error) {
        log(error, "Login.js");
      } else if (result == false) {
        // this response occurs if the username was correct but password was incorrect
        this.res.status(200).json({
          success: false,
          userNotify: { message: "That email or password is invalid" }
        });
      } else if (result == true) {
        delete data.rows[0].password; //ensure the pw hash isn't sent along to the client
        this.res.status(200).json({ success: true, userNotify: {} });
      }
    });
  } else {
    // this response occurs if the user does not exist
    this.res
      .status(200)
      .json({
        userNotify: { message: "That email or password is invalid" },
        userData: ""
      });
  }
};

module.exports = Login;
