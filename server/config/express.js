const express = require('express');
const path = require('path');
const engine = require('ejs');
const flash = require('express-flash')
const session = require('express-session');
const config  = require('./index');

const { sessionSecret } = config.keys;


module.exports = (app, config) => {

  app.set('views', path.join(config.root, '/server/views'));
  

  app.set('view engine', 'ejs');
  app.use(express.static(config.serveStatics));
  app.use(require('express-session')({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
  }));

  app.use(flash());

  app.use((req, res, next) => {
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
  }); 

  require(path.join(config.root, '/server/controllers/flights'))(app);
  require(path.join(config.root, '/server/controllers/index'))(app);
  
};
