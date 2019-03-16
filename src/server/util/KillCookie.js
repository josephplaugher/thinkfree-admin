const KillCookie = (req, res, next) => {
  const authorized = "authorized";
  const cookieName = process.env.COOKIE_NAME;
  if (typeof req.cookies[cookieName] != "undefined") {
    //check if cookie exists
    //upon authentication, renew the cookie
    let userData = req.cookies[cookieName];
    req.headers["admin"] = false; // for authorizing api calls
    res.header(authorized, false); // for keeping the user logged in on the client side
    res.cookie(process.env.COOKIE_NAME, null, {
      expires: new Date(Date.now()),
      maxAge: -1,
      httpOnly: true,
      secure: process.env.NODE_ENV === true
    });
    res.status(200).json({ loggedout: true });
  } else {
    res.header(authorized, false); // for loggin the user out on the client side
    req.headers["admin"] = false; // for stopping authorizing api calls
    res.status(200).json({ loggedout: true });
  }
};

module.exports = KillCookie;
