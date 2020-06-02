const config = require('config');
const jwt = require('jsonwebtoken');

function simpleUser(req, res, next) {
  console.log('pass in');
  //We grab the token from the header
  const token = req.header('x-auth-token');

  //  Check if the token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token
  try {
    const decodedToken = jwt.verify(token, config.get('jwtSecret'));

    let role = decodedToken.role;

    //  Check if user is user
    if (role === 'USER') {
      //We attach user into the request
      req.user = decodedToken;
    } else {
      return res.status(401).json({ msg: 'User isnt elevated enough' });
    }
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = simpleUser;
