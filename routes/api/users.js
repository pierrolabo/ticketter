const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const User = require('../../models/User');

//  @route POST api/users
//  @desc   Register new users
//  @access Public
router.post('/', async (req, res) => {
  const { name, surname, email, password } = req.body;

  //  Quick data validations
  if (!name || !surname || !email || !password) {
    return res.status(400).json({ msg: 'All fields must be complete!' });
  }

  //  Check if email exist in database
  let emailInDatabase = await User.findOne({ email });

  //  Email already in database
  if (emailInDatabase) {
    return res.status(400).json({ msg: 'This email is already registered!' });
  }

  //  User is not in database, we create a new user
  const newUser = new User({
    name,
    surname,
    email,
    password,
  });

  //  Create salt & hash
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      if (err) throw err;
      newUser.password = hash;

      newUser.save().then((user) => {
        //Sign the token
        jwt.sign(
          //  set the role in the token payload
          {
            id: user.id,
            role: user.role,
          },
          config.get('jwtSecret'),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;

            //  Send the token back
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                email: user.email,
              },
            });
          }
        );
      });
    });
  });
});

module.exports = router;
