var mongoose = require('mongoose');


var houseSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  slug: { type: String, unique: true },
  contact: Object,
  location: Object,
  image: String,
  city: { type: String },
  description: String,
  creator: String,
  image: {
    type: String,
    default: 'https://placehold.it/500'
  }
});

// houseSchema.index({ title: 'text', city: 'text' });
houseSchema.index({'$**': 'text'});
var Houses = mongoose.model('Houses', houseSchema);

module.exports = Houses;
