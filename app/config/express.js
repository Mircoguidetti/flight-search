const path = require('path');
const engine = require('ejs-mate');




module.exports = (app, config) => {
  app.engine('ejs', engine);
  app.set('views', path.join(config.root, 'app/views'));
  app.set('view engine', 'ejs')

  // require index route
  require(path.join(config.root, '/app/controllers/index'))(app)
}
