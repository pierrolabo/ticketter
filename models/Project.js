const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  Create Schema
const ProjectSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  tickets: {
    type: Array,
    default: [],
  },
});

module.exports = Project = mongoose.model('project', ProjectSchema);
