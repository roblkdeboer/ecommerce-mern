import React from 'react';
import products from '../products';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {/* For each product, what do I want to show */}
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            {/* Pass in each product from the map to render each of the products */}
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
