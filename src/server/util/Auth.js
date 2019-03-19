const Auth = (req, res, next) => {
  const authorized = "authorized";
  const cookieName = process.env.COOKIE_NAME;
  if (typeof req.cookies[cookieName] != "undefined") {
    //check if cookie exists
    //upon authentication, renew the cookie
    let userData = req.cookies[cookieName];
    req.headers["admin"] = true; // for authorizing api calls
    res.header(authorized, true); // for keeping the user logged in on the client side
    res.cookie(process.env.COOKIE_NAME, userData, {
      expires: new Date(Date.now() + 60 * 60 * 1000),
      maxAge: 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === true
    });
    next();
  } else {
    res.header(authorized, false); // for loggin the user out on the client side
    req.headers["admin"] = false; // for stopping authorizing api calls
    next();
  }
};

module.exports = Auth;
