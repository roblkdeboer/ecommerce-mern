import express from 'express';
import asyncHandler from 'express-async-handler';
import Product from '../models/productModel.js';
const router = express.Router();

// @desc Fetch all products
// @route GET /api/products
// @access Public
// Use async function as mongoose returns a promise
router.get(
  '/',
  asyncHandler(async (req, res) => {
    const products = await Product.find({});

    res.json(products);
  })
);

// @desc Fetch single product
// @route GET /api/products/:id
// @access Public
router.get(
  '/:id',
  asyncHandler(async (req, res) => {
    // Search the DB with the ID that is in the URL
    const product = await Product.findById(req.params.id);

    if (product) {
      res.json(product);
    } else {
      // Error throws when a formated objectID is not valid
      res.status(404);
      throw new Error('Product not found');
    }
  })
);

export default router;
