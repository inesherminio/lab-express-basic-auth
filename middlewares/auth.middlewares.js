module.exports = {
    isLoggedIn: (req, res, next) => {
      /* You want to check if there is a current user on the session */
      if (req.session.currentUser) {
        next();
      } else {
        /* The route is only signin */
        res.redirect("/signin");
      }
    },
  };