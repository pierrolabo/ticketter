require('dotenv').config();
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.jwtSecret;

module.exports = {
  getRoleFromToken: (token) => {
    if (!token) return { role: null, id: null };
    try {
      //Verify token
      const decoded = jwt.verify(token, JWT_SECRET);
      //add user from payload
      return decoded;
    } catch (err) {
      console.log(`Error getRoleFromToken: ${err}`);
    }
  },
};
