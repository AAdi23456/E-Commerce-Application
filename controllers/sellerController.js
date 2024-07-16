const { PrismaClient } = require('@prisma/client');
const logger = require('../logger');

const prisma = new PrismaClient();

const addProduct = async (req, res) => {
  try {
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.userId; // Assuming user ID is available in req.user

    const product = await prisma.product.create({
      data: {
        name,
        category,
        description,
        price,
        discount,
        sellerId,
      },
    });

    logger.info('Product added: %s by user %s', product.name, sellerId);
    res.status(201).json({ message: 'Product created successfully',product });
  } catch (error) {
    logger.error('Error adding product: %O', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const editProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, category, description, price, discount } = req.body;
    const sellerId = req.user.userId;

    const product = await prisma.product.updateMany({
      where: {
        id: Number(id),
        sellerId,
      },
      data: {
        name,
        category,
        description,
        price,
        discount,
      },
    });

    if (product.count === 0) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    logger.info('Product edited: %s by user %s', id, sellerId);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    logger.error('Error editing product: %O', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const sellerId = req.user.id;

    const product = await prisma.product.deleteMany({
      where: {
        id: Number(id),
        sellerId,
      },
    });

    if (product.count === 0) {
      return res.status(404).json({ error: 'Product not found or unauthorized' });
    }

    logger.info('Product deleted: %s by user %s', id, sellerId);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    logger.error('Error deleting product: %O', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  addProduct,
  editProduct,
  deleteProduct
  
};
