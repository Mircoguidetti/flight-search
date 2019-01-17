const path = require('path');

const rootPath = path.join(__dirname, '../../');

const env = process.env.NODE_ENV || 'development';

const config = {
  'development': {
    'name': 'development',
    'root': rootPath,
    'port': 5000,
    'serveStatics': path.join(rootPath, '/public'),
    'keys': module.exports = require('./keys/dev')

  },

  'production': {
    'name': 'production',
    'root': rootPath,
    'port': process.env.PORT,
    'keys': module.exports = require('./keys/prod')
  }
};

module.exports = config[env];
