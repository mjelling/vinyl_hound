var mongoose = require('mongoose');



var albumSchema = mongoose.Schema({
  album_name: { type: String, required: true },
  mbid: { type: String },
  artist_name: {type: String, required: true},
  album_rank: { type: Number },
  album_cover_url: {type: String }
  }, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);
