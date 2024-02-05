const mongoose = require('mongoose');
const validator = require('validator ');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please tell us your name.'],
  },
  email: {
    type: String,
    required: [true, 'Please provide your email.'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
  },
  passwordConfirm: {
    type: String,
    required: true,
  },
  photo: String,
});

const User = mongoose.model('User', userSchema);
module.exports = User;

