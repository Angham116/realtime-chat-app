const express = require('express');
const app = express();
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const {
  addUser,
  getUser,
  removeUser,
  getUsersInRoom,
} = require('./Users');

const routes = require('./routers');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Enable security, CORS, compression
app.use(helmet());
app.use(cors());
app.use(compress());

// Create HTTP server
const http = require('http').createServer(app);
const io = socketio(http);

//  listening on the connection event for incoming sockets
io.on('connection', socket => {
  console.log('socket.io connected');

  /*
  * @description socket.on('join-chat', cb) is event when user is joining the chat
  * @description addUser is a service used to add new user
  * @param { name, user } is object of new uer
  * @param socket.id is ID of new user joined
  */
  socket.on('join-chat', ({ name, room }, callback) => {
    // const { username, room } = user;
    const { error, newUser } = addUser({ userId: socket.id, username: name, room });
    
    if(error) {
      return callback(error);
    }

    // handling the msg when someone join the room
    socket.emit('chat-msg', {
      user: 'admin', 
      // this is telling the joind user welcome
      text: `${newUser.username}, welcome to the ${newUser.room} room`
    });

    // sending a message to everyone else except for the socket that starts it.
    // socket.broadcast.to(the name of room that the user is targeting)
    socket.broadcast.to(newUser.room).emit('chat-msg', {
      user: 'admin',
      // this is telling the room users new user was joined
      text: `${newUser.username} has joind`
    })
    // socket.join(the name of room that the uer want to join)
    socket.join(newUser.room)

    callback();
  });

  /*
  * @description socket.on('send-msg', cb) is event when user is send msg on chat room
  * @description getUser is a service used to get user who send the msg
  * @param user is object of user who send the msg 
  * @param socket.id is ID of user
  */
  socket.on('send-msg', (message, callback) => {
    const { user } = getUser({userId: socket.id });
    io.to(user.room).emit('chat-msg', { user: user.username, text: message });
    callback();
  });

  socket.on('disconnect', () => {
    console.log('socket.io disconnect')
  })
});

app.use('/api', routes);

// Serve React (client) files
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  app.use(favicon(path.join(__dirname, '..', 'client', 'build', 'favicon.ico')));
  app.get('*', (req, res) => {
    res.sendFile(
      path.join(__dirname, '..', 'client', 'build', 'index.html'),
    );
  });
}

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
