const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  userID: {
    type: String,
    default: null,
  },
  images: {
    type: Array,
    default: [],
  },
});

const Gallery = mongoose.model('Gallery', gallerySchema);
module.exports = Gallery;