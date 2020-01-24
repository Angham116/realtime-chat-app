const app = require('./server/app');
const mongoose = require('mongoose');
const dbConnection = require('./server/db/connection');

const PORT = process.env.PORT || 5000;

// Connect to the mongo database
dbConnection()
mongoose.connection.on('connected', () => {
  // Listen on provided port, on all network interfaces.
  app.listen(PORT);
  app.on('error', onError);
  app.on('listening', onListening);
});

mongoose.connection.on('error', (err) => {
  console.error(err)
});

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }
}

function onListening() {
  const addr = app.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    :  addr.port;
  console.info(`Listening on http://localhost:${bind}/api`);
}
