var mongoose = require('mongoose');



var wishlistSchema = mongoose.Schema({
  username: { type: String, required: true },
  userID: { type: String, required: true },
  wishlist_ranked: { type: Array, required: true },
  }, { timestamps: true });

module.exports = mongoose.model('Wishlist', wishlistSchema);
