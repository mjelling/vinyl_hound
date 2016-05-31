var mongoose = require('mongoose');



var recommendationSchema = mongoose.Schema({
  username: { type: String, required: true },
  userID: { type: String, required: true },
  recommended_records: { type: Array, required: true },
  }, { timestamps: true });

module.exports = mongoose.model('Recommendation', recommendationSchema);
