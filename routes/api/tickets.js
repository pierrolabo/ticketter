const express = require('express');
const router = express.Router();
var mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
//TODO: Add route permissions + data validations for ID

//const auth = require('../../middleware/auth');

//  Tickets Model
const Ticket = require('../../models/Ticket');
const Project = require('../../models/Project');
getRoleFromToken = (token) => {
  try {
    //Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //add user from payload
    return decoded;
  } catch (e) {}
};
//  @route GET api/tickets
//  @desc   Get All tickets
//  @access Public
router.get('/', async (req, res) => {
  try {
    const token = req.header('x-auth-token');
    const { role, id } = getRoleFromToken(token);
    //  If is admin => all the tickets
    if (role === 'ADMIN') {
      Ticket.find()
        .sort({ date: -1 })
        .then((tickets) => res.json(tickets));
    } else {
      //  We get the projects where the user is
      const projects = await Project.find({ userList: id });
      //  We get the tickets from those projects
      const projectsID = projects.map((project) => project._id);
      let tickets = await Ticket.find({ projectID: { $in: projectsID } });
      {
        _id: {
          $in: projectsID;
        }
      }
      res.json(tickets);
    }
    // else return tickets in project where the user is assigned
  } catch (err) {}
});
//  @route GET api/tickets
//  @desc   Get single ticket
//  @access Public
router.get('/:id', (req, res) => {
  const { id } = req.params;
  Ticket.find({ _id: id }).then((tickets) => res.json(tickets));
});

//  @route POST api/tickets
//  @desc   Create a ticket without a project assigned (general ticket)
//  @access public
router.post('/', async (req, res) => {
  const {
    title,
    description,
    created_by,
    status,
    assigned_to,
    projectID,
  } = req.body;
  //  We validate the data first
  if (!title || !description || !created_by) {
    return res.status(400).json({ msg: 'All fields must be completed!' });
  }
  //  First we need the "GENERAL" collection from project
  let generalTicket = await Project.find({ name: 'GENERAL' });

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
    //  If projectID is defined, the ticket is assigned to a project
    //  else we use the general project,
    const id = projectID ? projectID : generalTicket[0]._id;
    const newTicket = new Ticket({
      projectID: id,
      title,
      description,
      created_by,
      status: status === '' ? 'NEW' : status,
      assigned_to,
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
router.put('/setCompletedTicket/:id', (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  if (!id || !userID) {
    return res
      .status(400)
      .json({ msg: 'Error setCompletedTicket, all fields must be complete ' });
  }

  let query = { _id: id };
  let update = {
    $set: { isCompleted: true, userID, last_Updated: new Date() },
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
//  @route PUT api/tickets/setAssignedTo/
//  @desc   Change ticket assignation
//  @access public
router.put('/setAssignedTo/:id', (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;

  if (!id || !userID) {
    return res
      .status(400)
      .json({ msg: 'Error setCompletedTicket, all fields must be complete ' });
  }

  let query = { _id: id };
  let update = {
    $set: { assigned_to: userID, last_Updated: new Date() },
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
//  @route PUT api/tickets/:ticketID
//  @desc   Update a ticket
//  @access public
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const {
    title,
    description,
    assigned_to,
    projectID,
    status,
    nextProjID,
  } = req.body;
  if (!id || !title || !description || !projectID || !status) {
    return res
      .status(400)
      .json({ msg: 'Error updating ticket, all fields must be complete ' });
  }
  const updatedProjectID = nextProjID ? nextProjID : projectID;
  let queryTicket = { _id: id };
  let updateTicket = {
    $set: {
      title,
      description,
      assigned_to,
      projectID: updatedProjectID,
      status,
    },
  };
  let optionsTicket = { new: true, useFindAndModify: false };

  //  UPDATE ticket from ticket collection
  try {
    updatedTicket = await Ticket.findOneAndUpdate(
      queryTicket,
      updateTicket,
      optionsTicket
    );
  } catch (err) {
    if (err) console.log(err);
    return res.status(400).json({ msg: 'Error updating ticket ' });
  }
  //  If project has to change
  if (nextProjID) {
    //  Update project accordingly
    let oldProject = { _id: projectID };
    let newProject = { _id: nextProjID };
    let deleteTicketProject = {
      $pull: { tickets: mongoose.Types.ObjectId(id) },
    };
    let addTicketProject = {
      $push: { tickets: mongoose.Types.ObjectId(id) },
    };
    let options = { new: true, useFindAndModify: false };
    try {
      let deletetick = await Project.findOneAndUpdate(
        oldProject,
        deleteTicketProject,
        options
      );
    } catch (err) {
      if (err) console.log(err);
      return res
        .status(400)
        .json({ msg: 'Error deleting ticket from project ' });
    }
    //  Add the ticket id to project collection
    try {
      let addtick = await Project.findOneAndUpdate(
        newProject,
        addTicketProject,
        options
      );
    } catch (err) {
      if (err) console.log(err);
      return res.status(400).json({ msg: 'Error pushing ticket to project ' });
    }
  }
  //  We return the updated ticket
  res.json(updatedTicket);
});
module.exports = router;
