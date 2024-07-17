const { PrismaClient } = require('@prisma/client');
const logger = require('../logger');

const prisma = new PrismaClient();

/**
 * searchProducts - Function to search for products based on name and/or category
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

const searchProducts = async (req, res) => {
  try {
    const { name, category } = req.query;

     // Fetch products from the database that match the name and/or category criteria
    const products = await prisma.product.findMany({
      where: {
        ...(name && { name: { contains: name, mode: 'insensitive' } }), // Case-insensitive search for name
        ...(category && { category: { contains: category, mode: 'insensitive' } }), // Case-insensitive search for category
      },
    });

    logger.info('Products searched with name: %s and category: %s', name, category);
    res.status(200).json(products);
  } catch (error) {
    logger.error('Error searching products: %O', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * addToCart - Function to add a product to the user's cart
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const buyerId = req.user.userId;

 // Add product to the cart in the database
    const cart = await prisma.cart.create({
      data: {
        productId,
        quantity,
        buyerId,
      },
    });

    logger.info('Product %s added to cart by user %s', productId, buyerId);
    res.status(201).json({ message: 'Product added to cart successfully' ,cart});
  } catch (error) {
    logger.error('Error adding product to cart: %O', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * removeFromCart - Function to remove a product from the user's cart
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const buyerId = req.user.id;

     // Delete the specified cart item from the database
    const cartItem = await prisma.cart.deleteMany({
      where: {
        id: Number(id),
        buyerId,
      },
    });

    if (cartItem.count === 0) {
      return res.status(404).json({ error: 'Cart item not found or unauthorized' });
    }

    logger.info('Product %s removed from cart by user %s', id, buyerId);
    res.status(200).json({ message: 'Product removed from cart successfully' });
  } catch (error) {
    logger.error('Error removing product from cart: %O', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

/**
 * getCartItems - Function to get all items in the user's cart
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
const getCartItems = async (req, res) => {
  try {
    const buyerId = req.user.userId;

     // Fetch all cart items for the user from the database, including related product details
    const cartItems = await prisma.cart.findMany({
      where: {
        buyerId,
      },
      include: {
        product: true, // Include related product details
      },
    });

    logger.info('Cart items retrieved for user %s', buyerId);
    res.status(200).json(cartItems);
  } catch (error) {
    logger.error('Error retrieving cart items: %O', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  searchProducts,
  addToCart,
  removeFromCart,
  getCartItems
};
