const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  address: {
    type: Array,
    default: null,
  },
  role: {
    type: String,
    default: 'USER',
  },
});

module.exports = User = mongoose.model('user', UserSchema);
