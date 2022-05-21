const isLoggedOut = (req, res, next) => {
	console.log("Not supposed to enter here !")
	if (req.session.currentUser) {
		return res.redirect("/")
	}
	next()
}

module.exports = isLoggedOut

/* This is also an auth middleware, so put it on the auth.middlewares file as well */