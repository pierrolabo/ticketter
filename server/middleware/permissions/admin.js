require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.jwtSecret;

function admin(req, res, next) {
  //We grab the token from the header
  const token = req.header('x-auth-token');

  //  Check if the token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    //  Check if user is admin
    let role = decodedToken.role;
    if (role === 'ADMIN') {
      next();
    } else {
      return res.status(401).json({ msg: 'User isnt elevated enough' });
    }
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = admin;
