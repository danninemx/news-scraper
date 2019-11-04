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

    let siteUrl = "https://www.texastribune.org";
    // Grab the body of the html with request
    // axios.get("http://www.startribune.com/local/").then(function (response) {
    axios.get(siteUrl).then(function (response) {

      // Load body into cheerio and save it to $ for a shorthand selector
      let $ = cheerio.load(response.data);

      // console.log(response.data);

      // Now, we grab every h2 within an div tag, and do the following:
      //$("div h2").each(function(i, element) {
      //now try for every article with an image then get headline, link and summary

      // $("div.tease-container-right").each(function (i, element) {
      //$("div.item-info").each(function (i, element) {
      $("article").each(function (i, element) {

        // Save an empty result object
        let result = {};

        // if ($(this).parents('.trending') ) {


        // result.title = $(this).find("a.tease-headline").text().trim();
        // Site currently uses "headline" class on one of multiple heading tags with nested <a> that contains text for headline.
        result.title = $(this).find(".headline>a").text().trim();
        console.log(result.title);

        // Site currently uses <figure class="image_default"> that nests <a> for link to full article.
        result.link = $(this).find("figure>a").attr("href");
        console.log(siteUrl + result.link);

        // Site currently uses <div> or <section> with class="prose" that nests <p> for summary text.
        // result.summary = $(this).find("div.tease-summary").text().trim();
        result.summary = $(this).find(".prose>p").text().trim();
        console.log(result.summary);

        // Site currently uses an image src that includes another URL to a static site.
        // result.image = $(this).find("a.tease-headline").find("div.tease-photo-img").find("img").attr("src");

        let imgSrcArray = $(this).find("figure.image_default picture").find("img").attr("src").split('https://');
        // If the src includes second URL, use that part only.
        if (imgSrcArray.length > 2) {
          result.image = 'https://' + imgSrcArray[2];
          console.log(result.image + "\n");
        } else {
          result.image = 'https://' + imgSrcArray[1];
          console.log(result.image + "\n");
        }


        // console.log(result);

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