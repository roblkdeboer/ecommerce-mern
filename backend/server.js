import path from 'path';
import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

// Allow us to accept JSON data in the request body
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.get('/', (req, res) => {
  res.send('API is running');
});

// For anything directed to products, send it to the product router
app.use('/api/products', productRoutes);

// For anything directed to users, send it to the users router
app.use('/api/users', userRoutes);

// For anything related to orders, send it to this router
app.use('/api/orders', orderRoutes);

// For anything related to uploading, send it to this router
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// Make uploads folder static
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

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
