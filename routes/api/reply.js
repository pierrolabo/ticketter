const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

//  Tickets Model
const Ticket = require('../../models/Ticket');

//  @route POST api/reply/:ticketID
//  @desc   POST a reply in a ticket
//  @access public
router.post('/:id', async (req, res) => {
  const { id } = req.params;
  const { reply } = req.body;
  if (!reply || !id) {
    return res.status(400).json({ msg: 'All fields must be completed!' });
  }

  const newReply = {
    replyID: mongoose.Types.ObjectId(),
    reply,
    created_by: 'BLANK',
    date: Date.now(),
  };
  let query = { _id: id };
  let update = { $push: { answers: newReply } };
  let options = { new: true, useFindAndModify: false };

  Ticket.findOneAndUpdate(query, update, options)
    .then((ticket) => {
      res.json(ticket);
    })
    .catch((err) => {
      console.log(err);
    });
});
//  @route DELETE api/reply/
//  @desc   DELETE a reply in a ticket
//  @access public
router.delete('/', (req, res) => {
  const { ticketID, answerID } = req.body;
  if (!ticketID || !answerID) {
    return res.status(400).json({ msg: 'All fields must be completed!' });
  }
  let query = { _id: ticketID };
  let update = {
    $pull: { answers: { replyID: mongoose.Types.ObjectId(answerID) } },
  };
  let options = { new: true, useFindAndModify: false };
  Ticket.findOneAndUpdate(query, update, options).then((data) => {
    res.json(data);
  });
});
module.exports = router;
