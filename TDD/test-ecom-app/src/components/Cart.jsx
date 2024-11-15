import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, initializeCart } from "../features/cartSlice"; // Ensure this path is correct

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const totalItems = useSelector(state => state.cart.totalItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  return (
    <Container>
      <Row>
        <h2>Cart</h2>
        <h3>Total Items: {totalItems}</h3>
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
      </Row>
      <Row className="p-3">
        {cart.map((item) => (
          <div key={item.id}>
            <h4>{item.title}</h4>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
            <Button variant="danger" onClick={() => handleDelete(item.id)}>Delete</Button>
          </div>
        ))}
      </Row>
    </Container>
  );
};

export default Cart;
