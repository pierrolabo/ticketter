const express = require('express');
const router = express.Router();
//const auth = require('../../middleware/auth');

//  Tickets Model
const Ticket = require('../models/Ticket');

//  @route PUT api/tickets/
//  @desc   Set a ticket to completed
//  @access public
router.post('/', (req, res) => {
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
    .catch((err) => {});
});
//  @route EDIT api/answer
//  @desc   EDIT an answer
//  @access public
router.put('/edit', async (req, res) => {
  const { id, answerId, editedAnswer } = req.body;
  if (!id || !answerId || !editedAnswer) {
    res.status(400).json({ msg: 'Error EDIT all field must me complete' });
  }

  //  Get the ticket answers then update without the answer to delete
  try {
    const ticket = await Ticket.findById(id);
    const answers = ticket.answers;

    //  Check if there's no answers in the ticket theres a bug
    if (answers.length === 0) {
      res
        .status(400)
        .json({ msg: 'Error theres no answers to edit in this ticket' });
    }

    const filteredAnswers = answers.map((answer) => {
      if (answer.id == answerId) {
        answer.answer = editedAnswer;
        return answer;
      }
      return answer;
    });
    //We update the ticket answers without the answer to delete
    let query = { _id: id };
    let update = {
      $set: { answers: filteredAnswers },
      last_updated: new Date(),
    };
    let options = { new: true, upsert: true, useFindAndModify: false };
    Ticket.findOneAndUpdate(query, update, options)
      .then((ticket) => {
        res.json(ticket);
      })
      .catch((err) => {});
  } catch (err) {
    console.log('edit answer: ', err);
  }
});
//  @route DELETE api/answer
//  @desc   DELETE an answer
//  @access public
router.delete('/', async (req, res) => {
  const { id, answerId } = req.body;
  if (!id || !answerId) {
    res.status(400).json({ msg: 'Error delete all field must me complete' });
  }

  //  Get the ticket answers then update without the answer to delete
  try {
    const ticket = await Ticket.findById(id);
    const answers = ticket.answers;

    //  Check if there's no answers in the ticket theres a bug
    if (answers.length === 0) {
      res
        .status(400)
        .json({ msg: 'Error theres no answers to delete in this ticket' });
    }

    const filteredAnswers = answers.filter((answer) => answer.id != answerId);

    //We update the ticket answers without the answer to delete
    let query = { _id: id };
    let update = {
      $set: { answers: filteredAnswers },
      last_updated: new Date(),
    };
    let options = { new: true, upsert: true, useFindAndModify: false };
    Ticket.findOneAndUpdate(query, update, options)
      .then((ticket) => {
        res.json(ticket);
      })
      .catch((err) => {
        console.log('delete answer: ', err);
      });
  } catch (err) {
    console.log('delete answer: ', err);
  }
});

module.exports = router;
