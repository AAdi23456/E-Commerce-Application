const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { searchProducts, addToCart, removeFromCart ,getCartItems} = require('../controllers/buyerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleValidator = require("../middleware/roleValidator")
const router = express.Router();

/**
 * Route to search for products
 * GET /products
 */
router.get('/products',
     // Validate and sanitize query parameters
    [
        body('name').optional().isString().trim().escape(),
        body('category').optional().isString().trim().escape(),
    ],
    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
              // If there are validation errors, return a 400 status with the error details
            return res.status(400).json({ errors: errors.array() });
        }
        // If validation passes, proceed to the next middleware or route handler
        next();
    },
    searchProducts// Call the searchProducts controller function
);

router.post('/cart',
    authMiddleware,   // Middleware to authenticate the user


    [
         // Validate and sanitize request body
        body('productId').isInt(), // Must be an integer
        body('quantity').isInt(),  // Must be an integer
    ],
      // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    addToCart // Call the addToCart controller function
);

/**
 * Route to remove a product from the cart
 * DELETE /cart/:id
 */
router.delete('/cart/:id',
    authMiddleware, 
    [
         // Validate and sanitize request parameters
        param('id').isInt(),
    ],
    // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    removeFromCart  // Call the removeFromCart controller function
);

/**
 * Route to get all items in the cart
 * GET /cart
 */
router.get('/cart',
    authMiddleware, 

     // Middleware to check for validation errors
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    getCartItems  // Call the getCartItems controller function
);

module.exports = router;
