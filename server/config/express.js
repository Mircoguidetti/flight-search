const express = require('express');
const path = require('path');
const engine = require('ejs');
const flash = require('express-flash')
const session = require('express-session');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('../db/mongoose');
const { sessionSecret, cookieKey } = require('./index').keys;



module.exports = (app, config) => {

  // Config static files and view engine
  app.set('views', path.join(config.root, '/server/views'));
  app.set('view engine', 'ejs');
  app.use(express.static(config.serveStatics));

  app.use(bodyParser.json());
  
  // Config cookie-session
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [ cookieKey ]
    })
  );


  // Config flash
  app.use(flash());
  app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
  }); 
  
  // Config passport
  app.use(passport.initialize());
  app.use(passport.session());

  // Config controllers
  require(path.join(config.root, '/server/controllers/flights'))(app);
  require(path.join(config.root, '/server/controllers/index'))(app);
  require(path.join(config.root, '/server/controllers/googleAuth'))(app);
  require(path.join(config.root, '/server/services/passport'));
};
