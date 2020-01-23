const app = require('express')();

// Create HTTP server
const http = require('http').createServer(app);

app.get('/', (req, res) => {
  res.send('<h1>Hello from chat app</h1>');
})


module.exports = http;
