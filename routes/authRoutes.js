const express = require('express');
const { body, validationResult } = require('express-validator');
const { signUp, login } = require('../controllers/authController');
const router = express.Router();

/**
 * Route to handle user sign up
 * POST /signup
 */
router.post('/signup',
   // Validate and sanitize input fields
  [
    body('username').isString().trim().escape(),
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).escape(),
    body('role').isIn(['SELLER', 'BUYER']).escape(),
  ],
   // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req);// Collect validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, proceed to the next middleware or route handler
    next();
  },
  signUp // Call the signUp controller function
);

/**
 * Route to handle user login
 * POST /login
 */
router.post('/login',
  // Validate and sanitize input fields
  [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }).escape(),
  ],
  // Middleware to check for validation errors
  (req, res, next) => {
    const errors = validationResult(req); // Collect validation errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // If validation passes, proceed to the next middleware or route handler
    next();  // Call the login controller function
  },
  login
);

module.exports = router;
