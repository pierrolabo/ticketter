const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastname: {
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
    type: String,
    default: null,
  },
  city: {
    type: String,
    default: null,
  },
  zip: {
    type: String,
    default: null,
  },
  state: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: 'USER',
  },
  orgs: {
    type: Array,
    default: [],
  },
});

module.exports = User = mongoose.model('user', UserSchema);
