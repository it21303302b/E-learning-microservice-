const jwt = require('jsonwebtoken');
const config = require('../config');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized: No token provided');
  }
  jwt.verify(token, config.jwtSecret, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).send('Unauthorized: Token expired');
      }
      return res.status(403).send('Forbidden: Invalid token');
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
