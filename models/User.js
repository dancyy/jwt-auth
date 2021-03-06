const mongoose = require('mongoose');
const moment = require('moment');
const now = moment();

const schema = new mongoose.schema({
  email: {type: String, unique: true, default: ''},
  username: {type: String, unique: true, default: ''},
  password: {type: String, default: ''},
  timestamp: {type: String, default: now.format('dddd, MMMM do YYYY, h:mm:ss a')},
});

module.exports = mongoose.model('user', schema);