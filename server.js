"use strict";
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const config = require('./config/env');
const mongoose = require('mongoose');
const {scrapeIntNews} = require('./helpers/scrapeArticles');
const {cleanUpOldArticles} = require('./controllers/ArticlesController');
const api = require('./routes/api');

// ..........................................................................
// Connect to Atlas with mongoose
// ..........................................................................
mongoose.connect( config.db.host, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

// ..........................................................................
// Init App
// ..........................................................................
const app = express();

// ..........................................................................
// App Middleware
// ..........................................................................
//security protocol
app.use(helmet());
// CORS Middleware
app.use(cors());

// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set init url path for api routes
app.use('/', api);

//test webscraper and old Articles clean up to make sure it works
setTimeout( async function () {
  console.log('scraping...');
  await scrapeIntNews();
  cleanUpOldArticles();
  console.log('complete...');
}, 900);

// ..........................................................................
// Port Settings
// ..........................................................................
// Set Port
app.set('port', (config.app.webserver.port));

app.listen(app.get('port'), ()=> {
    console.log('Server started on port ' + app.get('port'));
});
