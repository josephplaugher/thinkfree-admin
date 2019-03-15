const dotenv = require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const log = require('./util/Logger');
const blogCont = require('./controllers/blogCont');
const loginCont = require('./controllers/loginCont');
//const Sentry = require('@sentry/node');

//Sentry.init({ dsn: 'https://566911817f9f4112a1758b7c25c6cbb9@sentry.io/1358140' });

// The request handler must be the first middleware on the app
//app.use(Sentry.Handlers.requestHandler());

// The error handler must be before any other error middleware
//app.use(Sentry.Handlers.errorHandler());

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');

let port = process.env.PORT;
app.listen(port, function(){
  var msg = 'server started in '+ process.env.NODE_ENV + ' mode on port ' + port;
  console.log(msg);
  if(process.env.NODE_ENV === 'production') { log('',msg); }
});

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, authorization");
  res.set("X-Powered-By", "ThinkFree.Life");
  next();
});

app.use(bodyParser.urlencoded({ extended: false })); // Parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // Parse application/json

app.use('/', blogCont);
app.use('/', loginCont);

app.all('/*', (req, res) => {
  res.render('index');
});