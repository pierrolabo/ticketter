const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const simpleUser = require('../../middleware/permissions/simpleUser');
const User = require('../../models/User');

//  @route POST api/auth
//  @desc   Auth user
//  @access Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  //  Quick data validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'All fields must be complete' });
  }

  //  Check for existing user
  User.findOne({ email }).then((user) => {
    //  Check if email exist in database
    if (!user) {
      return res.status(400).json({ msg: 'Email does not exists' });
    }

    //  Validate password
    bcrypt.compare(password, user.password).then((isMatch) => {
      //Password doesnt match
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid credentials!' });
      }

      //Passwords match
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
              email: user.email,
            },
          });
        }
      );
    });
  });
});

//  @route GET api/auth/user
//  @desc   GET user data
//  @access private
router.get('/user', simpleUser, (req, res) => {
  console.log('req:', req.body);
  User.findById(req.user.id)
    .select('-password')
    .then((user) => res.json(user));
});

module.exports = router;
