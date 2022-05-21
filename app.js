// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv/config");

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

hbs.registerPartials(__dirname + "/views/partials");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most middlewares
require("./config")(app);

// default value for title local
const projectName = "lab-express-basic-auth";
const capitalized = (string) =>
  string[0].toUpperCase() + string.slice(1).toLowerCase();

app.locals.title = `${capitalized(projectName)}- Generated with Ironlauncher`;

// 👇 Start handling routes here
const index = require("./routes/index");
app.use("/", index);

// require signup route
const authApp = require("./routes/auth.routes");
app.use("/auth/", authApp);

/* As a plus, just so that you have another tool, when defining prefixes, like the private area, you can apply the 
middlewares. If you apply it here, all of the routes in that file will have the middleware. Simplifies! P.s. if using it here, dont forget to import it. */
const privateArea = require("./routes/private");
app.use("/auth/private", privateArea);
//app.use("/auth/private", isLoggedIn, privateArea);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
