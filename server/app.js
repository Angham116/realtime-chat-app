const app = require('express')();
const socketio = require('socket.io');

const routes = require('./routers');

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



module.exports = http;
