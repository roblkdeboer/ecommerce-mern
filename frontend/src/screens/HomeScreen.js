import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
  const dispatch = useDispatch();
  // Takes in state and what part of the state we want to select
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  //   Run when the component loads
  useEffect(() => {
    // Dispatch the listProducts action
    dispatch(listProducts());
    // Pass in an array of dependencies to trigger useEffect when it changes
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {/* If loading is true, show loading, if error, show error, else show the products */}
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
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
      )}
    </>
  );
};

export default HomeScreen;
