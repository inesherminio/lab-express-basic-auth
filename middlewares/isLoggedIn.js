const isLoggedIn = (req, res, next) => {
	if (req.session.currentUser) {
		return next()
	} else {
		/* Beware that you called all auth routes "singin" or "singup", and here you're redirecting to "signin", so it does not exists */
		return res.redirect("/signin")
	}
}

module.exports = isLoggedIn