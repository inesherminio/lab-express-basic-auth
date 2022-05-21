module.exports = {
  isLoggedIn: (req, res, next) => {
    // check if currentUser exists
    if (req.session.currentUser) {
      next();
    } else {
      return res.redirect("/auth/login");
    }
  },
};

/* This file does the same as the isLoggedIn.js. I would suggest you keep this one and put all the auth middlewares here, like the isLoggedOut */