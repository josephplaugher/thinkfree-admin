const dotenv = require("dotenv").config();
const express = require("express");
const SetUrl = require("./util/SetUrl");
const Auth = require("./util/Auth");
const bodyParser = require("body-parser");
const app = express();
const cookieParser = require("cookie-parser");
const blogCont = require("./controllers/blogCont");
const loginCont = require("./controllers/loginCont");

app.use(express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./src/views");

let port = process.env.PORT;
app.listen(port, function() {
  var msg =
    "server started in " + process.env.NODE_ENV + " mode on port " + port;
  console.log(msg);
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", SetUrl());
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "your blog title here");
  next();
});

app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(cookieParser());
app.use(bodyParser.json()); // Parse application/json

app.get("/checkLoginState", Auth, (req, res) => {
  res.status(200).json({ checkLoginState: "done" });
});

app.use("/", loginCont);
//all the blog edit/creation routes require a valid cookie
app.use("/", Auth, blogCont);
//this route renders the UI. The UI will check for the cookie
//and log the user out if it doesn't exist.
app.all("/*", (req, res) => {
  res.render("index");
});
