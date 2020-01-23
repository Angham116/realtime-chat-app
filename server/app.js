const express = require('express');
const app = express();
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');

const routes = require('./routers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Create HTTP server
const http = require('http').createServer(app);
const io = socketio(http);

//  listening on the connection event for incoming sockets
io.on('connection', socket => {
  console.log('socket.io connected');
  socket.on('disconnect', () => {
    console.log('socket.io disconnect')
  })
});

app.use('/api', routes);

// error handler
app.use((err, req, res, next) => {
  let errObj = { message: err.message };

  // for boom errors
  if (err.isBoom) {
    const { statusCode } = err.output;
    res.status(err.output.statusCode || 500);
    if (statusCode === 409 || statusCode === 422) {
      errObj = err.data;
    }
  } else {
    res.status(500);
    errObj.message = 'Internal server error';
  }
  res.json({ error: errObj });
});

module.exports = http;
