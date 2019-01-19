const moment  = require('moment');

module.exports = (app) => {
  app.get('/', (req, res) => {
    res.render('index', {flightContext: undefined, moment: moment});
  });
};
