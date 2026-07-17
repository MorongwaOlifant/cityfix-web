// middleware/verifyToken.js
const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];
  const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;

  if (!accessTokenSecret) {
    return res.status(500).json({ message: 'Authentication is not configured' });
  }

  // Check if header exists and starts with "Bearer "
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, accessTokenSecret);
    req.user = verified; // Store decoded user info in request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
