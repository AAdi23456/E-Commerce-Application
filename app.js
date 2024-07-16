require('dotenv').config();
const express = require('express');
const logger = require('./logger');
const authRoutes = require('./routes/authRoutes');
const sellerRoutes = require('./routes/sellerRoutes');
const buyerRoutes = require('./routes/buyerRoutes');

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  logger.info('Incoming request: %s %s', req.method, req.url);
  next();
});

app.use('/auth', authRoutes);
app.use('/seller', sellerRoutes);
app.use('/buyer', buyerRoutes);

app.use((err, req, res, next) => {
  logger.error('Unhandled error: %O', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});
