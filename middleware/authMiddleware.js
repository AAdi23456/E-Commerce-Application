const jwt = require('jsonwebtoken');


/**
 * authMiddleware - Middleware function to authenticate requests using JWT
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 */
const authMiddleware = (req, res, next) => {

   // Extract the token from the 'Authorization' header, if it exists
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ error: 'Access denied, no token provided.' });
  }
  try {
      // Verify the token using the secret key from environment variables
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    // If the token is invalid, return a 400 Bad Request error
    res.status(400).json({ error: 'Invalid token.' });
  }
};

module.exports = authMiddleware;
