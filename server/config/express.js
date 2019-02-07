const express = require('express');
const path = require('path');
const engine = require('ejs');
const flash = require('express-flash');
const cookieSession = require('cookie-session');
const passport = require('passport');
const mongoose = require('../db/mongoose');
const { cookieKey } = require('./index').keys;


module.exports = (app, config) => {

  // Config static files and view engine
  app.set('views', path.join(config.root, '/server/views'));
  app.set('view engine', 'ejs');
  app.use(express.static(config.serveStatics));


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
  require(path.join(config.root, '/server/services/passport'));

  // Require routes 
  require(path.join(config.root, '/server/routes/flights'))(app);
  require(path.join(config.root, '/server/routes/index'))(app);
  require(path.join(config.root, '/server/routes/googleAuth'))(app);

};
