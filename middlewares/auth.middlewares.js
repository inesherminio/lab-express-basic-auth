module.exports = {
    isLoggedIn: (req, res, next) => {
      if (req.session) {
        next();
      } else {
        res.redirect("/auth/signin");
      }
    },
  };