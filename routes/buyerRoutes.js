const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { searchProducts, addToCart, removeFromCart ,getCartItems} = require('../controllers/buyerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleValidator = require("../middleware/roleValidator")
const router = express.Router();

router.get('/products',
    [
        body('name').optional().isString().trim().escape(),
        body('category').optional().isString().trim().escape(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    searchProducts
);

router.post('/cart',
    authMiddleware, 
    [
        body('productId').isInt(),
        body('quantity').isInt(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    addToCart
);

router.delete('/cart/:id',
    authMiddleware, 
    [
        param('id').isInt(),
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    removeFromCart
);
router.get('/cart',
    authMiddleware, 
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    },
    getCartItems
);

module.exports = router;
