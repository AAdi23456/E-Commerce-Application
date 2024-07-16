const express = require('express');
const { body, param, validationResult } = require('express-validator');
const { addProduct, editProduct, deleteProduct } = require('../controllers/sellerController');
const authMiddleware = require('../middleware/authMiddleware');
const roleValidator=require("../middleware/roleValidator")
const router = express.Router();

router.post('/products',
  authMiddleware ,roleValidator("SELLER"),
  [
    body('name').isString().trim().escape(),
    body('category').isString().trim().escape(),
    body('description').isString().trim().escape(),
    body('price').isFloat(),
    body('discount').isFloat().optional({ nullable: true }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  addProduct
);

router.put('/products/:id',
  authMiddleware,roleValidator("SELLER"),
  [
    param('id').isInt(),
    body('name').isString().trim().escape(),
    body('category').isString().trim().escape(),
    body('description').isString().trim().escape(),
    body('price').isFloat(),
    body('discount').isFloat().optional({ nullable: true }),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  editProduct
);

router.delete('/products/:id',
  authMiddleware,roleValidator("SELLER"),
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
  deleteProduct
);

module.exports = router;
