var mongoose = require('mongoose');

var bouncebackSchema = mongoose.Schema({
  username: { type: String, required: true },
  userID: { type: String, required: true },
  albums: { type: Array, required: true }
  }, { timestamps: true });

module.exports = mongoose.model('Bounceback', bouncebackSchema);
