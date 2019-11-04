const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

// Initialize Express
const express = require("express");
const app = express();

// Grab the headlines as a json
module.exports = function (app) {
  // A GET route for scraping the source site
  app.get("/scrape", function (req, res) {

    let siteUrl = "https://www.texastribune.org";
    // Grab the body of the html with request
    axios.get(siteUrl).then(function (response) {

      // Load body into cheerio and save it to $ for a shorthand selector
      let $ = cheerio.load(response.data);

      // For every <article>, get headline, link and summary
      $("article").each(function (i, element) {

        // Save an empty result object
        let result = {};

        // Site currently uses "headline" class on one of multiple heading tags with nested <a> that contains text for headline.
        result.title = $(this).find(".headline>a").text().trim();
        console.log(result.title);

        // Site currently uses <figure class="image_default"> that nests <a> for link to full article.
        result.link = siteUrl + $(this).find("figure>a").attr("href");
        console.log(result.link);

        // Site currently uses <div> or <section> with class="prose" that nests <p> for summary text.
        result.summary = $(this).find(".prose>p").text().trim();
        console.log(result.summary);

        // Site currently uses an image src that includes another URL to a static page.
        let imgSrcArray = $(this).find("figure.image_default picture").find("img").attr("src").split('https://');
        // If the src includes second URL, use that part only. Use it as-is otherwise.
        if (imgSrcArray.length > 2) {
          result.image = 'https://' + imgSrcArray[2];
          console.log(result.image + "\n");
        } else {
          result.image = 'https://' + imgSrcArray[1];
          console.log(result.image + "\n");
        }

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