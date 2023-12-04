const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
  userID: {
    type: String,
    default: null,
  },
  labels: {
    type: Array,
    default: [],
  },
  notes: {
    type: Array,
    default: [],
  },
});

const Notes = mongoose.model('Notes', notesSchema);
module.exports = Notes;