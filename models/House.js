var getSlug = require('speakingurl');
var mongoose = require('mongoose');


var houseSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  slug: { type: String, unique: true },
  contact: Object,
  location: Object,
  image: String,
  description: String,
  creator: String
});

houseSchema.index({name: 'text', 'title': 'text'});



var Houses = mongoose.model('Houses', houseSchema);

module.exports = Houses;
