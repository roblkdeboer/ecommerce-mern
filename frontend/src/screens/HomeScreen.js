import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const HomeScreen = () => {
  // What we want to call the state, products
  // What we want to call the function to manipulate the state, setProducts
  const [products, setProducts] = useState([]);

  //   Run when the component loads
  //   Have to define a function to use async arrow functions
  //   Destructure data object in the response
  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');

      setProducts(data);
    };

    fetchProducts();
    // Pass in an array of dependencies to trigger useEffect when it changes
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {/* For each product, what do I want to show */}
        {products.map((product) => (
          // Need to add an unique key to filter through (_id)
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            {/* Pass in each product from the map to render each of the products */}
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
