var mongoose = require('mongoose');



var artistSchema = mongoose.Schema({
  artist_name: { type: String, required: true },
  mbid: { type: String },
  connected_artists: { type: Array },
  albums_ranked: { type: Array },
  number_of_albums: { type: Number },
  artist_image_url: { type: String }
  }, { timestamps: true });

module.exports = mongoose.model('Artist', artistSchema);
