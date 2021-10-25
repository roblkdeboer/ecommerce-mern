import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';

// @desc Fetch all products
// @route GET /api/products
// @access Public
// Use async function as mongoose returns a promise
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({});

  res.json(products);
});

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  // Search the DB with the ID that is in the URL
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    // Error throws when a formated objectID is not valid
    res.status(404);
    throw new Error('Product not found');
  }
});

export { getProducts, getProductById };
