const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");

// Initialize Express
const express = require("express");
const app = express();

//Require mongojs
const mongoose = require("mongoose");

module.exports = function (app) {

  // Route for getting all unsaved articles from the db
  // This is for the root and uses index.handlebars
  app.get("/", function (req, res) {
    // Grab every document in the Articles collection
    db.Article.find({ saved: false }, function (err, result) {
      if (err) {
        console.log("Error in finding unsaved articles: " + err);
      }
      else {
        res.render("index", {
          articles: result
        });
      }
    });
  });

  // This grabs id of article being saved and updates the saved from false to true
  app.put("/savedarticles/:id", function (req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: true })
      .then(function (result) {
        console.log("This article has been saved.");
        res.json(result);

      })
      .catch(function (err) {
        res.json(err);
        console.log("Error in finding saved articles: " + err);
      });
  });

  // This grabs id of article being unsaved and updates the saved from true to false
  app.put("/unsavedarticles/:id", function (req, res) {

    db.Article.findOneAndUpdate({ _id: req.params.id }, { saved: false })
      .then(function (result) {
        console.log("This article has been un-saved.");
        res.json(result);

      })
      .catch(function (err) {
        res.json(err);
        console.log("Error in finding saved articles: " + err);
      });
  });

  // Route for getting all of the saved articles
  // This is for the /saved path and uses saved.handlebars
  app.get("/saved", function (req, res) {
    // Query: in our database, go to the articles collection, 
    // Then "find" every article that is saved (has a saved value of true);
    db.Article.find({ saved: true }, function (error, result) {
      // Log any errors if the server encounters one.
      if (error) {
        console.log("Error in getting saved articles: " + error);
      }
      // Otherwise, send the result of this query to the browser.
      else {
        //res.json(result);
        console.log(`\n The saved articles are : ${result} \n`);
        res.render("saved", {
          articles: result
        });
      }
    });
  });

  // // Route for getting all articles from the db. Currently not specifically needed.
  // app.get("/all", function (req, res) {
  //   // Grab every document in the Articles collection
  //   db.Article.find({ saved: false }, function (err, result) {
  //     if (err) {
  //       console.log("Error in finding all articles: " + err);
  //     }
  //     else {
  //       res.render("index", {
  //         articles: result
  //       });
  //     }
  //   });
  // });

  // This grabs id of article and deletes it from the database
  app.delete("/deletearticles/:id", function (req, res) {

    db.Article.findOneAndRemove({ _id: req.params.id })
      .then(function (result) {
        console.log("This article has been deleted.");
        res.json(result);

      })
      .catch(function (err) {
        res.json(err);
        console.log("Error in finding saved articles: " + err);
      });
  });


  app.post('/', function (req, res) {
    res.json(data);
  });

}