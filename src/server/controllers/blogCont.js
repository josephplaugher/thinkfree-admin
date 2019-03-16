const routes = require("express").Router();
const db = require("./../util/postgres");
const email = require("../model/EmailSubscribed");
const Conn = db.Conn;

const Auth = function(admin) {
  if (admin === true) {
    return true;
  } else {
    return false;
  }
};
routes.get("/getBlogList", (req, res) => {
  if (Auth(req.headers["admin"]) === true) {
    Conn.query(
      `SELECT title, description, postid, body, published 
      FROM posts ORDER BY postid DESC`
    )
      .catch(e => console.log(e, "blogCont.js"))
      .then(resp => {
        res.status(200).json({ blogList: resp.rows });
      });
  }
});

routes.get("/selectPost/:id", (req, res) => {
  if (Auth(req.headers["admin"]) === true) {
    const query = {
      text: `SELECT title, description, postid, body, published
    FROM posts WHERE postid = $1`,
      values: [req.params.id]
    };
    Conn.query(query)
      .catch(e => console.log(e, "blogCont.js"))
      .then(resp => {
        res.status(200).json({ activePost: resp.rows[0] });
      });
  }
});

routes.post("/saveEdits", (req, res) => {
  if (Auth(req.headers["admin"]) === true) {
    var i = req.body;
    const query = {
      text: `UPDATE posts 
    SET (title, description, body) 
    = ($1, $2, $3) 
    WHERE postid = $4`,
      values: [i.title, i.description, i.body, i.postid]
    };
    Conn.query(query)
      .catch(e => console.log(e, "blogCont.js"))
      .then(resp => {
        res.status(200).json({ status: "Post Edits Saved" });
      });
  }
});

routes.get("/publishPost/:id", (req, res) => {
  if (Auth(req.headers["admin"]) === true) {
    const query = {
      text: `UPDATE posts
    SET published = true
    WHERE postid = $1`,
      values: [req.params.id]
    };
    Conn.query(query)
      .catch(e => console.log(e, "blogCont.js"))
      .then(resp => {
        var emailSubscribed = new email(req, res);
        emailSubscribed.getList();
        res.status(200).json({ status: "Post Published" });
      });
  }
});

routes.get("/unpublishPost/:id", (req, res) => {
  if (Auth(req.headers["admin"]) === true) {
    const query = {
      text: `UPDATE posts
    SET published = false
    WHERE postid = $1`,
      values: [req.params.id]
    };
    Conn.query(query)
      .catch(e => console.log(e, "blogCont.js"))
      .then(resp => {
        var emailSubscribed = new email(req, res);
        emailSubscribed.getList();
        res.status(200).json({ status: "Post UnPublished" });
      });
  }
});

module.exports = routes;
