var mongoose = require('mongoose');



var collectedSchema = mongoose.Schema({
  userID: { type: String, required: true },
  username: { type: String, required: true },
  album_name: { type: String, required: true },
  album_mbid: { type: String },
  artist_name: {type: String, required: true},
  album_cover_url: {type: String },
  album_rank: { type: Number },
  album_quality: { type: Number, min: 0, max: 10, default: null }
  }, { timestamps: true });

module.exports = mongoose.model('Collected', collectedSchema);
