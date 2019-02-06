const mongoose = require('mongoose');
const { keys } = require('../config/index');

mongoose.Promise = global.Promise;

// Connect to DATABASE
const url = keys.mongoURI;
mongoose.connect(url, { useNewUrlParser: true });

module.exports = { mongoose };