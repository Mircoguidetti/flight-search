const path = require('path');
const keys = require('./keys/index');

const rootPath = path.join(__dirname, '../../');

const env = process.env.NODE_ENV || 'development';

const config = {
  'development': {
    'name': 'development',
    'root': rootPath,
    'port': 5000,
    'serveStatics': path.join(rootPath, '/public'),
    'keys': keys

  },

  'production': {
    'name': 'production',
    'root': rootPath,
    'port': process.env.PORT,
    'serveStatics': path.join(rootPath, '/public'),
    'keys': keys
  }
};

module.exports = config[env];
