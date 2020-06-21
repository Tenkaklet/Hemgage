var mongoose = require('mongoose');


var houseSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  slug: { type: String, unique: true },
  contact: Object,
  location: Object,
  photoGallery: Array,
  city: { type: String },
  creator: String,
  balcony: Boolean,
  electricity: String,
  floors: String,
  internet: String,
  rooms: String,
  pool: Boolean,
  renovations: String,
  tomtarea: Number,
  type: String,
  heat: String,
  veranda: Boolean,
  boarea: String,
  garage: Boolean,
  greenhouse: Boolean,
  uteplats: Boolean,
  heat: String,
  water: String,
  year: String,
  image: {
    type: String,
    default: 'https://placehold.it/500'
  }
});

// houseSchema.index({ title: 'text', city: 'text' });
houseSchema.index({'$**': 'text'});
var Houses = mongoose.model('Houses', houseSchema);

module.exports = Houses;
