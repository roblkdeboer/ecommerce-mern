import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { listProductDetails } from '../actions/productActions';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCountInStock(product.countInStock);
      setCategory(product.category);
      setDescription(product.description);
    }
  }, [dispatch, productId, product]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log('Update Product');
  };

  return (
    <>
      <Link to="/admin/productList" className="btn btn-light my-3">
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter Name"
                value={name}
                // Whatever we type in updates the email state
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="price"
                placeholder="Enter Price"
                value={price}
                // Whatever we type in updates the email state
                onChange={(e) => setPrice(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="image">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="price"
                placeholder="Enter Image URL"
                value={image}
                // Whatever we type in updates the email state
                onChange={(e) => setImage(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="brand">
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type="brand"
                placeholder="Enter Brand"
                value={brand}
                // Whatever we type in updates the email state
                onChange={(e) => setBrand(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="countInStock">
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type="countInStock"
                placeholder="Enter Count In Stock"
                value={countInStock}
                // Whatever we type in updates the email state
                onChange={(e) => setCountInStock(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="category">
              <Form.Label> Category</Form.Label>
              <Form.Control
                type="category"
                placeholder="Enter Category"
                value={category}
                // Whatever we type in updates the email state
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label> Description</Form.Label>
              <Form.Control
                type="description"
                placeholder="Enter Description"
                value={description}
                // Whatever we type in updates the email state
                onChange={(e) => setDescription(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              className="login-button mt-3"
              type="submit"
              variant="primary"
            >
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
