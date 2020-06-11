const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');

//TODO: Add route permissions + data validations for ID

//const auth = require('../../middleware/auth');

//  Tickets Model
const Ticket = require('../../models/Ticket');
const Project = require('../../models/Project');

//  @route GET api/tickets
//  @desc   Get All tickets
//  @access Public
router.get('/', (req, res) => {
  Ticket.find()
    .sort({ date: -1 })
    .then((tickets) => res.json(tickets));
});

//  @route POST api/tickets
//  @desc   Create a ticket without a project assigned (general ticket)
//  @access public
router.post('/', async (req, res) => {
  const { title, description, created_by, status } = req.body;
  //  We validate the data first
  if (!title || !description || !created_by) {
    return res.status(400).json({ msg: 'All fields must be completed!' });
  }
  //  First we need the "GENERAL" collection from project
  let generalTicket = await Project.find({ name: 'GENERAL' });

  console.log(status);
  //  If we cant find it we create one
  if (generalTicket.length === 0) {
    const newProject = new Project({
      name: 'GENERAL',
      description: 'The general project where all tickets unsassigned fall',
    });
    //  We create/save the general project
    try {
      await newProject.save();
    } catch (err) {
      return res
        .status(400)
        .json({ msg: 'Error creating the general project' });
    }
  } else {
    //  There's already a general project, so we use it
    const id = generalTicket[0]._id;

    const newTicket = new Ticket({
      projectID: id,
      title,
      description,
      created_by,
      status,
    });
    let updatedProject = '';
    try {
      let createdTicket = await newTicket.save();
      let ticketID = createdTicket._id;
      let query = { _id: id };
      let update = { $push: { tickets: ticketID } };
      let options = { new: true, upsert: true, useFindAndModify: false };
      try {
        updatedProject = await Project.findOneAndUpdate(query, update, options);
        //res.json(updatedProject);
      } catch (err) {
        return res
          .status(400)
          .json({ msg: 'Error updating project with new ticket' });
      }
    } catch (err) {
      return res.status(400).json({ msg: 'Error creating ticket' });
    }

    //  Return all the tickets from the project
    try {
      let tickets = await Ticket.find().where('_id').in(updatedProject.tickets);
      res.json(tickets);
    } catch (err) {
      return res
        .status(400)
        .json({ msg: 'Error returning tickets from the project' });
    }
  }
});
//  @route POST api/tickets/:projectID
//  @desc   Create a ticket with a project assigned
//  @access public
router.post('/:id', async (req, res) => {
  const { id } = req.params; //The projectID
  const { title, description, created_by } = req.body;
  if (!title || !description || !created_by || !id) {
    return res.status(400).json({ msg: 'All fields must be completed!' });
  }

  const newTicket = new Ticket({
    projectID: id,
    title,
    description,
    created_by,
  });

  let updatedProject = '';
  try {
    let createdTicket = await newTicket.save();
    let ticketID = createdTicket._id;
    let query = { _id: id };
    let update = { $push: { tickets: ticketID } };
    let options = { new: true, upsert: true, useFindAndModify: false };
    try {
      updatedProject = await Project.findOneAndUpdate(query, update, options);
      //res.json(updatedProject);
    } catch (err) {
      return res
        .status(400)
        .json({ msg: 'Error updating project with new ticket' });
    }
  } catch (err) {
    return res.status(400).json({ msg: 'Error creating ticket' });
  }

  //  Return all the tickets from the project
  try {
    let tickets = await Ticket.find().where('_id').in(updatedProject.tickets);
    res.json(tickets);
  } catch (err) {
    return res
      .status(400)
      .json({ msg: 'Error returning tickets from the project' });
  }
});

//  @route DELETE api/tickets/:ticketID
//  @desc   Delete a ticket
//  @access public
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const { projectID } = req.body;
  let updatedProject = '';
  // Delete ticket from ticket collection
  try {
    await Ticket.deleteOne({ _id: id });
  } catch (err) {
    res.status(400).json({ msg: 'Error deleting ticket from ticket' });
  }
  // Delete ticket from project
  try {
    let query = { _id: projectID };
    let update = { $pull: { tickets: mongoose.Types.ObjectId(id) } };
    let options = { new: true, upsert: true, useFindAndModify: false };

    updatedProject = await Project.findByIdAndUpdate(query, update, options);
    //res.json(updatedProject);
  } catch (err) {
    res.status(400).json({ msg: 'Error deleting ticket from project' });
  }
  //  Return all the tickets from the project
  try {
    let tickets = await Ticket.find().where('_id').in(updatedProject.tickets);
    res.json(tickets);
  } catch (err) {
    return res
      .status(400)
      .json({ msg: 'Error returning tickets from the project' });
  }
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
