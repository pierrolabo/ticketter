const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//  Create Schema
const TicketSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  projectID: {
    type: Schema.ObjectId,
    require: true,
  },
  answers: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  status: {
    type: String,
    default: 'New',
  },
  assigned_to: {
    type: Array,
    default: [],
  },
  created_by: {
    type: String,
    required: true,
  },
  completed_by: {
    type: String,
    default: null,
  },
  last_updated: {
    type: Date,
    default: Date.now,
  },
  ip_address: {
    type: String,
    default: null,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Ticket = mongoose.model('ticket', TicketSchema);
