const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

// Initialize Express
//const app = express();
const express = require("express");
const app = express();

//fetch all had app.js file contents here
// Grab the headlines as a json
module.exports = function (app) {
  // A GET route for scraping the star tribune website
  app.get("/scrape", function (req, res) {
    // First, we grab the body of the html with request
    axios.get("http://www.startribune.com/local/").then(function (response) {

      // Then we load that into cheerio and save it to $ for a shorthand selector
      let $ = cheerio.load(response.data);

      // Now, we grab every h2 within an div tag, and do the following:
      //$("div h2").each(function(i, element) {
      //now try for every article with an image then get headline, link and summary
      $("div.tease-container-right").each(function (i, element) {
        //$("div.item-info").each(function (i, element) {

        // Save an empty result object
        let result = {};

        result.title = $(this).find("a.tease-headline").text().trim();
        result.link = $(this).find("a.tease-headline").attr("href");
        result.summary = $(this).find("div.tease-summary").text().trim();
        result.image = $(this).find("a.tease-headline").find("div.tease-photo-img").find("img").attr("src");

        console.log(result);

        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
          .then(function (dbArticle) {
            // View the added result in the console
            console.log(dbArticle);
          })
          .catch(function (err) {
            // If an error occurred, send it to the client
            console.log("you have a scrape error occuring in the fetch.js file: " + err);
            return res.json(err);
          });
      });

      // If we were able to successfully scrape and save an Article, send a message to the client
      res.send("Scrape Complete");
    });
  });
}