const { PrismaClient } = require('@prisma/client');
const logger = require('../logger');

const prisma = new PrismaClient();

const searchProducts = async (req, res) => {
  try {
    const { name, category } = req.query;

    const products = await prisma.product.findMany({
      where: {
        ...(name && { name: { contains: name, mode: 'insensitive' } }),
        ...(category && { category: { contains: category, mode: 'insensitive' } }),
      },
    });

    logger.info('Products searched with name: %s and category: %s', name, category);
    res.status(200).json(products);
  } catch (error) {
    logger.error('Error searching products: %O', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const buyerId = req.user.userId;

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

const removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;
    const buyerId = req.user.id;

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
const getCartItems = async (req, res) => {
  try {
    const buyerId = req.user.userId;

    const cartItems = await prisma.cart.findMany({
      where: {
        buyerId,
      },
      include: {
        product: true, 
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
