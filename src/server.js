global.window = {};
// API boilerplate
const express = require('express');
const cors = require('cors');

const app = express();
const morgan = require('morgan');
const config = require('config');
const swaggerUi = require('swagger-ui-express');
const routes = require('./routes');
const docs = require('./docs');
const db = require('./databaseWrapper/database');

const env = app.get('env');
if (env === 'test') {
  db.initDb('./db.sqlite');
}
db.initDb('/usr/src/app/db.sqlite');

// Logging
const logger = require('./logger');

require('./eventManager/eventListener');
// Config
app.use(cors());

// Set up middleware for request parsing, logging, etc.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('short', { stream: logger.stream }));

app.use(
  '/subscrypt-doc',
  swaggerUi.serve,
  swaggerUi.setup(docs),
);
// Load up the routes
app.use('/', routes);

// Start the API
app.listen(config.apiPort);
logger.log('info', `api running on port ${config.apiPort}`);

// Export API server for testing
module.exports = app;
