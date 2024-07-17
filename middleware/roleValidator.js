/**
 * roleValidator - Middleware function to authorize users based on their role
 * @param {string} requiredRole - The role required to access the route
 * @returns {Function} Middleware function for Express
 */

const roleValidator = (requiredRole) => {
    return (req, res, next) => {
      const userRole = req.user.role; 

      // Check if the user's role matches the required role
      if (userRole !== requiredRole) {
        return res.status(403).json({ error: 'Unauthorized' });
      }
      // If the user's role matches the required role, proceed to the next middleware or route handler
      next();
    };
  };
  
  module.exports = roleValidator;
  