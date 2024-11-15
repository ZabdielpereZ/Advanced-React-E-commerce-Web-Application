import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem, checkout } from "../features/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart.cart);
  const totalItems = useSelector(state => state.cart.totalItems);
  const totalPrice = useSelector(state => state.cart.totalPrice);

  const handleDelete = (id) => {
    dispatch(deleteItem(id));
  };

  const handleCheckout = () => {
    dispatch(checkout());
    alert("Checkout successful! Your cart has been cleared.");
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
      <Row className="mt-3">
        <Button variant="success" onClick={handleCheckout}>Checkout</Button>
      </Row>
    </Container>
  );
};

export default Cart;

















// import React from 'react'
// import { Button, Container, Row } from 'react-bootstrap'
// import { useDispatch, useSelector } from 'react-redux'
// import { deleteItem } from '../features/cartSlice'


// const Cart = () => {

//     // access data from our global store 
//     // useSelector lets us access our state by selecting which we want to access. In this case, we only have a cart state and we select it by passing a function (state) => state. THE_STATE_YOU_WANT_ACCESS_TO 
//     // The state you have access to will be in the reducers section of your store.js
//     // on the left hand side const { ... }, the data inside {} is the specific property you want to access. For here, you are referring to the properties you've set up inside initialState inside of your slice file so you can access either cart (the property) or totalItems
//    const { cart } = useSelector((state) => state.cart) // cart - state 
//    const dispatch = useDispatch();

//    const totalItems = useSelector(state => state.cart.totalItems);
//    const totalPrice = useSelector(state => state.cart.totalPrice);


//    const handleDelete = (id) => {
//     console.log('clicked delete')
//     console.log(id)
//     // dispatch an action to delete the item from our cart
//     dispatch(deleteItem(id))
//    }

//   return (
//     <Container>
//         <Row>
//             <h3>Total Items: {totalItems}</h3>
//             <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
//         </Row>
//       <Row className='p-3'>
//         {cart.map((item) => (
//             <div key={item.id}>
//               <h4>{item.title}</h4>
//               <p>Quantity: {item.quantity}</p>
//               <p>Price: ${item.price}</p>
//               <Button variant='danger' onClick={() => handleDelete(item.id)}>Delete</Button>
//             </div>
//         )) }
//       </Row>
//     </Container>
//   )
// }

// export default Cart
