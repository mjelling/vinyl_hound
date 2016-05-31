var mongoose = require('mongoose');



var collectionSchema = mongoose.Schema({
  username: { type: String, required: true },
  userID: { type: String, required: true },
  collection_ranked: { type: Array, required: true },
  }, { timestamps: true });

module.exports = mongoose.model('Collection', collectionSchema);
