const config = require('config');
const jwt = require('jsonwebtoken');

function admin(req, res, next) {
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

    //  Check if user is admin
    let role = decodedToken.role;
    console.log('decodedToken: ', decodedToken);
    if (role === 'ADMIN') {
      next();
    }
    return res.status(401).json({ msg: 'User isnt elevated enough' });
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}

module.exports = admin;
