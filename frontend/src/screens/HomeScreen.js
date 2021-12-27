import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { Row, Col } from 'react-bootstrap';
import { listProducts } from '../actions/productActions';
import ProductCarousel from '../components/ProductCarousel';
import Meta from '../components/Meta';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();
  // Takes in state and what part of the state we want to select
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  //   Run when the component loads
  useEffect(() => {
    // Dispatch the listProducts action
    dispatch(listProducts(keyword, pageNumber));
    // Pass in an array of dependencies to trigger useEffect when it changes
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to="/" className="btn btn-light">
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {/* If loading is true, show loading, if error, show error, else show the products */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
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
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
