const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
var mongoose = require('mongoose');
const config = require('config');
const jwt = require('jsonwebtoken');
//TODO: Add route permissions + data validations for ID

//const admin = require('../../middleware/permissions/admin');
const Project = require('../models/Project');
const Ticket = require('../models/Ticket');
getRoleFromToken = (token) => {
  try {
    //Verify token
    const decoded = jwt.verify(token, config.get('jwtSecret'));
    //add user from payload
    return decoded;
  } catch (e) {}
};

//  @route GET api/projects
//  @desc   Get the list of all projects
//  @access public
router.get('/', (req, res) => {
  try {
    const token = req.header('x-auth-token');
    const { role, id } = getRoleFromToken(token);

    //  If is admin => all the tickets
    if (role === 'ADMIN') {
      Project.find().then((projects) => res.json(projects));
    } else {
      Project.find({ userList: id }).then((projects) => res.json(projects));
    }
  } catch (err) {}
});

//  @route POST api/projects
//  @desc   Create a new project
//  @access private
router.post('/', async (req, res) => {
  const { name, description, created_by } = req.body;
  //  Quick data validations
  if (!name || !description) {
    return res.status(400).json({ msg: 'All fields must be complete!' });
  }

  //  Check if project exist in database
  let projectInDatabase = await Project.findOne({ name });

  //  Project name already in database
  if (projectInDatabase) {
    return res
      .status(400)
      .json({ msg: 'This project is already in database!' });
  }

  //  Project is not in database, we create a new Project
  const newProject = new Project({
    name,
    description,
    userList: [created_by],
  });

  newProject
    .save()
    .then((project) => {
      res.json({ project });
    })
    .catch((err) => {
      return res.status(400).json({ msg: 'Error creating project!' });
    });
});

//  @route DELETE api/projects
//  @desc   Delete a project
//  @access public
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  // if id isnt set
  if (!id) {
    res.status(400).json({ msg: 'Error ID isnt set' });
  }
  let projectInDatabase = await Project.findOne({ _id: id });
  let ticketsInProject = projectInDatabase.tickets;
  let deleteTickets = { _id: { $in: ticketsInProject } };
  try {
    await Ticket.deleteMany(deleteTickets);
  } catch (err) {
    res.status(400).json({ msg: 'Error Deleting tickets from tickets' });
  }
  try {
    await Project.deleteOne({ _id: id });
  } catch (err) {
    res.status(400).json({ msg: 'Error Deleting project' });
  }

  res.json({ id: id });
});
//  @route PUT api/projects
//  @desc   Update a project
//  @access public
router.put('/', (req, res) => {
  const { name, description, _id, nextUsers } = req.body;
  if (!name || !description) {
    return res.status(400).json({ msg: 'name & description required' });
  }
  if (!_id) {
    return res.status(400).json({ msg: 'ID required ! ' });
  }

  let query = { _id: _id };
  let update = {
    $set: { name: name, description: description, userList: nextUsers },
  };
  let options = { new: true, useFindAndModify: false };

  Project.findOneAndUpdate(query, update, options)
    .then((project) => {
      res.json(project);
    })
    .catch((err) => {
      console.log(err);
      return res.status(400).json({ msg: 'error updating ticket' });
    });
});
module.exports = router;
