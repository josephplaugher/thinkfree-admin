const routes = require('express').Router();
const Login = require('./../model/Login')

routes.post('/adminLogin', (req, res) => {
  const login = new Login(req, res);
  login.login();
});

module.exports = routes;