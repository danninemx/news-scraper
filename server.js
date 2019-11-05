const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("./models");

let PORT = process.env.PORT || 3000;

// If deployed, use the deployed database. Otherwise use the local database
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Initialize Express
const app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions changed to false
app.use(bodyParser.urlencoded({ extended: false }));

//Parse application/json
app.use(bodyParser.json());

// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// By default mongoose uses callbacks for async queries; we are setting it to use promises (.then syntax) instead
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

//Set Handlebars
const exphbs = require("express-handlebars");
//sets main.handlebars as the default layout and our view engine as handlebar
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars")

const handlebars = require("handlebars");
handlebars.registerHelper("json", context => JSON.stringify(context));

//routes
require("./controllers/fetch.js")(app);
require("./controllers/headline.js")(app);
require("./controllers/note.js")(app);

// Start the server
app.listen(PORT, function () {
  console.log("App running on port " + PORT + "!");
});
