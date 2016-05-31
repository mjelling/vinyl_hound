var mongoose = require('mongoose');



var wantedSchema = mongoose.Schema({
  username: { type: String, required: true },
  userID: { type: String, required: true },
  album_name: { type: String, required: true },
  albumID: { type: String, required: true },
  mbid: { type: String },
  artistID: { type: String },
  artist_name: {type: String, required: true},
  album_quality: { type: Number, min: 0, max: 100, default: null },
  }, { timestamps: true });

module.exports = mongoose.model('Wanted', wantedSchema);
