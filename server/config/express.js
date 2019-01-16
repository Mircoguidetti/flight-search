const path = require('path');

module.exports = (app, config) => {
  require(path.join(config.root, '/server/controllers/flights'))(app)
};
