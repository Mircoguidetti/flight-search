const express = require('express');
const path = require('path');
const engine = require('ejs');


module.exports = (app, config) => {

  app.set('views', path.join(config.root, '/server/views'));

  app.set('view engine', 'ejs');
  app.use(express.static(config.serveStatics));

  require(path.join(config.root, '/server/controllers/flights'))(app);
  require(path.join(config.root, '/server/controllers/index'))(app);
};
