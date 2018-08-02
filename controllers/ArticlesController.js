"use strict";
// ..........................................................................
// IMPORTS & ALIASES
// ..........................................................................
const fs = require('fs');
const Article = require('../models/Articles');
const Category = require('../models/Categories');
const Sources = require('../models/Sources');
const Section = require('../models/Sections');
const scrapeUtilityLocal = require('../utilities/scrapeLocalNews');
const scrapeUtilityInt = require('../utilities/scrapeIntNews');
const moment = require('moment');
// ..........................................................................
// Article Forms and Previews
// ..........................................................................
//
//scrape local news Articles
module.exports.scrapeLocalNewsArticles = function(req, res) {

  setTimeout(function () {
    scrapeUtilityLocal.scrapeLocalNews()
  }, 3000);
  res.send('scraping local news...')
}

//scrape international news Articles
module.exports.scrapeIntNewsArticles = function(req, res) {
  setTimeout(function () {
    scrapeUtilityInt.scrapeIntNews()
  }, 3000);
  res.send('scraping int news...')
}
