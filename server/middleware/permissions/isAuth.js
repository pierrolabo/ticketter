require('dotenv').config();

const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.jwtSecret;

//  User is at least authenticated
function isAuth(req, res, next) {
  //We grab the token from the header
  const token = req.header('x-auth-token');
  //  Check if the token is present
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  //Verify token
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);

    //  We attach user into the request
    req.user = decodedToken;
    next();
  } catch (err) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
}
module.exports = isAuth;
