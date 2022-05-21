const isLoggedIn = (req, res, next) => {
	if (req.session.currentUser) {
		return next()
	} else {
		return res.redirect("/signin")
	}
}

module.exports = isLoggedIn

/* This file does the same as auth.middlewares.js, so you should erase it */