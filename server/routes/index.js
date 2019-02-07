const moment  = require('moment');

module.exports = (app) => {
  app.get('/', (req, res) => {
    const currentUser = req.user
    res.render('index', {flights: undefined, moment, currentUser});
  });
};
