const express = require('express');
const router = express.Router();
//const auth = require('../../middleware/auth');

//  Tickets Model
const Ticket = require('../../models/Ticket');

//  @route PUT api/tickets/
//  @desc   Set a ticket to completed
//  @access public
router.put('/addReply', (req, res) => {
  const { id, user, reply } = req.body;
  if (!id || !user || !reply) {
    res.status(400).json({ msg: 'Error addReply all field must me complete' });
  }
  let query = { _id: id };
  let update = {
    $push: { answers: reply },
    last_updated: new Date(),
  };
  let options = { new: true, upsert: true, useFindAndModify: false };

  Ticket.findOneAndUpdate(query, update, options)
    .then((ticket) => {
      res.json(ticket);
    })
    .catch((err) => {
      console.log('addReply: ', err);
    });
});

module.exports = router;
