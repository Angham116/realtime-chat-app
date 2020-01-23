const mongoose = require('mongoose');
const { DB_Url } = require('./config');

const dbConnection = () => mongoose.connect(DB_Url, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

module.exports = dbConnection;
