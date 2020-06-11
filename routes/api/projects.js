const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
var mongoose = require('mongoose');
//TODO: Add route permissions + data validations for ID

//const admin = require('../../middleware/permissions/admin');
const Project = require('../../models/Project');

//  @route GET api/projects
//  @desc   Get the list of all projects
//  @access public
router.get('/', (req, res) => {
  Project.find().then((projects) => res.json(projects));
});

//  @route POST api/projects
//  @desc   Create a new project
//  @access private
router.post('/', async (req, res) => {
  const { name, description } = req.body;
  //  Quick data validations
  if (!name || !description) {
    return res.status(400).json({ msg: 'All fields must be complete!' });
  }

  //  Check if project exist in database
  let projectInDatabase = await Project.findOne({ name });

  //  Email already in database
  if (projectInDatabase) {
    return res
      .status(400)
      .json({ msg: 'This project is already in database!' });
  }

  //  Project is not in database, we create a new Project
  const newProject = new Project({
    name,
    description,
  });

  newProject
    .save()
    .then((project) => {
      //  Send the token back
      res.json({ project });
    })
    .catch((err) => {
      return res.status(400).json({ msg: 'Error creating project!' });
    });
});

//  @route DELETE api/projects
//  @desc   Delete a project
//  @access public
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // if id isnt set
  if (!id) {
    res.status(400).json({ msg: 'Error ID isnt set' });
  }

  Project.deleteOne({ _id: id })
    .then((project) => {
      res.status(200).json({
        msg: 'success',
      });
    })
    .catch((err) => {
      res.json({ msg: 'error deleting project' });
    });
});

module.exports = router;
