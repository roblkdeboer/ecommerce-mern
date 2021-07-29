import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
  res.send('API is running');
});

// For anything directed to products, send it to the product router
app.use('/api/products', productRoutes);

// If someone tries to access an endpoint that is not defined
app.use(notFound);
// Writing custom middleware to intercept and generate error responses
app.use(errorHandler);

// If port isn't found in .env file, use 5000
const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);
