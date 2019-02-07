const express = require('express');
const configExpress = require('./server/config/express');
const config = require('./server/config/index');

// config express
const app = express();
configExpress(app, config);

// run the server
app.listen(config.port, () => {
  console.log(`Express server listening on port ${config.port}`);
});
