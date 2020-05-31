const express = require('express');
const router = express.Router();
//const auth = require('../../middleware/auth');

//  Tickets Model
const Ticket = require('../../models/Ticket');

//  @route GET api/tickets
//  @desc   Get All tickets
//  @access Public
router.get('/', (req, res) => {
  Ticket.find()
    .sort({ date: -1 })
    .then((tickets) => res.json(tickets));
});

//  @route POST api/tickets
//  @desc   Create a ticket
//  @access public
router.post('/', (req, res) => {
  const { title, description, created_by } = req.body;
  if (!title || !description || !created_by) {
    return res.status(400).json({ msg: 'All fields must be completed!' });
  }

  const newTicket = new Ticket({
    title,
    description,
    created_by,
  });
  newTicket.save().then((ticket) => res.json(ticket));
});

//  @route DELETE api/tickets/s
//  @desc   Delete a ticket
//  @access public
router.delete('/:id', (req, res) => {
  console.log('delete');
  Ticket.findById(req.params.id)
    .then((ticket) => ticket.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
});

//  @route PUT api/tickets/setCompleted/
//  @desc   Set a ticket to completed
//  @access public
router.put('/setCompletedTicket', (req, res) => {
  const { id, completed_by } = req.body;
  if (!id || !completed_by) {
    return res
      .status(400)
      .json({ msg: 'Error setCompletedTicket, all fields must be complete ' });
  }

  let query = { _id: id };
  let update = {
    $set: { isCompleted: true, completed_by, last_Updated: new Date() },
  };
  let options = { new: true, useFindAndModify: false };

  Ticket.findOneAndUpdate(query, update, options)
    .then((ticket) => {
      res.json(ticket);
    })
    .catch((err) => {
      console.log('error: ', err);
    });
});

module.exports = router;
