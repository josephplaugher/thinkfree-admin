const nodemailer = require("nodemailer");
const db = require("./../util/postgres");
const Conn = db.Conn;

function emailSubscribed(req, res) {
  this.req = req;
  this.res = res;
  this.emailList = "";
  this.subject = "";
  this.body = "";
}

emailSubscribed.prototype.getList = function() {
  Conn.query(
    `SELECT
        email, username
        FROM users
        WHERE subscribe = 't'`
  )
    .catch(e => console.log("error: ", e))
    .then(resp => {
      this.emailList = resp.rows;
      this.setContent();
    });
};

emailSubscribed.prototype.setContent = function() {
  const query = {
    text: `SELECT 
            title,
            description,
            body,
            postid
        FROM posts
        WHERE postid = $1`,
    values: [this.req.params.id]
  };
  Conn.query(query)
    .catch(e => console.log(e, " in blogCont.js"))
    .then(resp => {
      this.subject = resp.rows[0].title;
      this.body = `<h1><a href=${process.env.BLOG_URL}/?postid=${
        resp.rows[0].postid
      }>${resp.rows[0].title}</a></h1><br/>
            <h3>${resp.rows[0].description}<h3><br/><br/>
            <p>${resp.rows[0].body}</p><br/><br/>`;
      this.send();
    });
};

emailSubscribed.prototype.send = function() {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  });
  // setup email data with unicode symbols
  var i = 0;
  var list = this.emailList;
  let From = `${process.env.FROM_NAME} <${process.env.ADMIN_EMAIL}>`;
  for (i = 0; i < list.length; i++) {
    let mailOptions = {
      from: From, // sender address
      to: list[i].email, // list of receivers
      subject: this.subject, // Subject line
      html: this.body // html body
    };
    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      }
    });
  }
};

module.exports = emailSubscribed;
