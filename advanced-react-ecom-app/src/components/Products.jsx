import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Card, Button, Container, Row, Col, Modal } from "react-bootstrap";
import { addItem, initializeCart } from "../features/cartSlice";

const fetchProducts = async () => {
  const { data } = await axios.get("https://fakestoreapi.com/products");
  return data;
};

const Products = () => {
  // setting up dispatch this function sends a call to our redux store that consists of an action
  // that action determines which reducer function to run
  const dispatch = useDispatch();
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [modalShow, setModalShow] = useState(false);
  

  // initialize cart from local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      dispatch(initializeCart(JSON.parse(savedCart)));
    }
  }, [dispatch])

  const handleAddCart = (product) => {
    dispatch(addItem({ ...product, quantity: 1 }));
    setModalShow(true);
  };

  const SuccessModal = ({ show, onHide }) => (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>Product added to cart successfully!</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <Container>
      <h2>Products</h2>
      <Row>
        {products && products.length > 0 ? (
          products.map((product) => (
            <Col key={product.id} sm={12} md={6} lg={4} className="mb-3">
              <Card>
                <Card.Img variant="top" src={product.image} />
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  <Card.Text>Price: ${product.price}</Card.Text>
                  <Card.Text>Category: {product.category}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={() => handleAddCart(product)}
                  >
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))
        ) : (
          <div>No products available</div>
        )}
      </Row>
      <SuccessModal show={modalShow} onHide={() => setModalShow(false)} />
    </Container>
  );
};

export default Products;

