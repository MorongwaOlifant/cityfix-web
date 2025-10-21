const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  const authHeader = req.headers['authorization'];

  // 1. Check header exists and starts with Bearer
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: No token provided' });
  }

  // 2. Extract the token part only
  const token = authHeader.split(' ')[1];

  try {
    // 3. Verify using secret from .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Store decoded payload in req.user
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token is not valid' });
  }
};