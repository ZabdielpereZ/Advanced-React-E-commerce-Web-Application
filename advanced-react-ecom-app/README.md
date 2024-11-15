# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

<hr>

## Mini-Project: Advanced React E-commerce Web Application


**Either utilize the Ecommerce You built for the last Mini-Project utilizing your Flask API or if you so choose you can use the FaakeStoreAPI endpoint to simulate asynchronous data fetching.  This API, available at https://fakestoreapi.com/, provides a simulated environment for fetching product data, managing user authentication, and simulating CRUD operations on products, carts, and users. By utilizing this mock API, we can demonstrate the capabilities of the advanced topics reviewed within our Module’s Lessons.**

**Also, while both Context API and Redux Toolkit are valuable tools for state management, we'll focus on Redux for this project to deepen understanding and practice with Redux concepts.**

**Additionally, we'll encourage the use of React Query for data fetching due to its simplicity and efficiency, while still allowing flexibility for the use of either Context API or Redux Toolkit for state management.**

### Project Requirements 
**User CRUD (Utilize React Query) :
Create components for user management functionalities based on the User and Login endpoints of the Fake Store API , including:**

<hr>

**Create User: Develop a component to allow users to register by providing necessary information such as username, email, and password, among other data.**

### Creating User Example:
```
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const createUser = async (user) => {
  const { data } = await axios.post('https://fakestoreapi.com/users', user);
  return data;
};

const UserRegistration = () => {
  const mutation = useMutation({
    mutationFn: createUser,
  });

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({
      email,
      username,
      password,
    });
  };

  return (
    <Container className="mb-3">
      <h1>Create User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className='m-2' variant="warning" type="submit">Create User</Button>
      </form>
      {mutation.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? (
            <div>User created: {JSON.stringify(mutation.data)}</div>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default UserRegistration;

```

**Login: Implement a component for user login, where users can enter their credentials (username/email and password) to authenticate. (BONUS) if you want to add functionality to test the password from the login form with the password they created their user account with to add more robust authentication.**

**Update User: Develop a component to enable users to update their profile information, such as username, email, and password, among other data.**

### Updating User Example: 
```
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const updateUser = async (user) => {
  const { data } = await axios.put(`https://fakestoreapi.com/users/${user.id}`, user);
  return data;
};

const UpdateUser = () => {
  const mutation = useMutation({
    mutationFn: updateUser,
  });

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate({
      id,
      email,
      username,
      password,
    });
  };

  return (
    <Container className="mb-3">
      <h1>Update User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={id}
          onChange={(e) => setId(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button className='m-2' variant="warning" type="submit">Update User</Button>
      </form>
      {mutation.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? (
            <div>User updated: {JSON.stringify(mutation.data)}</div>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default UpdateUser;

```

**Delete User: Implement a component for users to delete their accounts, requiring confirmation before permanently removing the account.**

### Deleting User Example: 
```
import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Container, Button } from "react-bootstrap";
import axios from "axios";

const deleteUser = async (id) => {
  const { data } = await axios.delete(`https://fakestoreapi.com/users/${id}`);
  return data;
};

const DeleteUser = () => {
  const mutation = useMutation({
    mutationFn: deleteUser,
  });

  const [userId, setUserId] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    mutation.mutate(userId);
  };

  return (
    <Container className="mb-3">
      <h1>Delete User</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <Button className='m-2' variant="danger" type="submit">Delete User</Button>
      </form>
      {mutation.isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? (
            <div>User deleted</div>
          ) : null}
        </>
      )}
    </Container>
  );
};

export default DeleteUser;

```

**Session Storage for Logged In User Data:
Upon successful login, store the user data in session storage. 
Ensure that the user data persists across different components, allowing the user to stay authenticated until they log out or close the tab**

**Product Catalog:
Home Component and Navigation:
After user login, redirect to the home component of the product catalog.**

### Home Component Example:
```
import React from "react";
import { Container, Card } from "react-bootstrap";
import UserRegistration from "./UserRegistration";
import UpdateUser from "./UpdateUser";
import DeleteUser from "./DeleteUser";

const Home = () => {
  return (
    <Container className="mt-2">
      <Card>
        <h1 className='m-2'>Users 🏠</h1>
        <hr />
        <UserRegistration />
        <UpdateUser />
        <DeleteUser />
      </Card>
    </Container>
  );
};

export default Home;

```

**BONUS Implement navigation features allowing users to browse different sections of the catalog, such as product categories and search functionality.**

**Product Listing and Display:
Display all available products in the catalog, showing essential details such as title, price, category, description, and image.**

### Products Example: 
```
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

```

**(BONUS) Implement sorting functionality to allow users to sort products based on the backend API criteria.
Implement functionality to update the quantity of products in the cart and provide feedback to the user upon successful add**

**Adding Products to Shopping Cart:
Allow users to add products to their shopping cart directly from the product listing.
Implement functionality to update the quantity of products in the cart and provide feedback to the user upon successful addition.**

### Adding products to Cart / success modal Example:
```
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

```

**State Management with Redux Toolkit: 
Utilize Redux Toolkit for managing the shopping cart state, including adding, updating, and removing products from the cart.
Define a slice/reducers/actions to handle cart-related state changes and interactions** 

### Slice Example:
```
import { createSlice } from "@reduxjs/toolkit"

// Set up our initial state
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [],
  totalItems: 0,
  totalPrice: 0
};

// Create slice
export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      state.cart.push(item);
      state.totalItems = state.cart.length;
      state.totalPrice += item.price * item.quantity; // Update total price
      localStorage.setItem('cart', JSON.stringify(state.cart));
    },
    deleteItem: (state, action) => {
      const id = action.payload;
      const itemToDelete = state.cart.find(item => item.id === id);
      if (itemToDelete) {
        state.totalPrice -= itemToDelete.price * itemToDelete.quantity; // Update total price
        state.cart = state.cart.filter(item => item.id !== id);
        state.totalItems = state.cart.length;
        localStorage.setItem('cart', JSON.stringify(state.cart));
      }
    },
    initializeCart: (state, action) => {
      state.cart = Array.isArray(action.payload) ? action.payload : [];
      state.totalItems = state.cart.length;
      state.totalPrice = state.cart.reduce((total, item) => total + item.price * item.quantity, 0); // Calculate total price
    },
    checkout: (state) => {
      state.cart = [];
      state.totalItems = 0;
      state.totalPrice = 0;
      localStorage.removeItem('cart');
    }
  }
});

// Export actions
export const { addItem, deleteItem, initializeCart, checkout } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;

```

**Search Functionality (BONUS):
Implement search functionality allowing users to search for products by title and price.**

**Category Navigation (BONUS):
Provide navigation options for users to browse products within specific categories.
Fetch all available categories from the backend API and display them as navigation links for users to explore.**

**Local Storage for Shopping Cart:
Store the shopping cart data in local storage to ensure persistence across different components and browser sessions.
Implement logic to retrieve and update the shopping cart data from local storage, ensuring that the user's cart remains intact even after page refresh or browser closure.**

**Shopping Cart:
Shopping Cart Component:
Create a Shopping Cart component where users can view and manage the products within their cart.
Display a list of products currently added to the cart, including details such as product title, quantity, and price.**

### Cart Example:
```
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

```

**(BONUS) Provide options for users to update the quantity of each product in the cart, allowing them to increase, decrease, or remove items as needed.**

**Total Amount and Price Calculation:
Calculate and display the total number of products and the total price of the items in the cart.
Update these values dynamically as users modify the contents of their cart, ensuring accuracy and real-time feedback.**

**Checkout Functionality:
Implement a checkout feature allowing users to complete their purchases.
As there is no backend API for processing orders, simply clear the state management and local storage to simulate the checkout process.
Provide feedback to users upon successful checkout, indicating that their cart has been cleared.**

**Order History (BONUS):
Allow users to access a list of their previous carts, serving as a history of their orders.
Fetch the list of user carts from the backend API endpoint.
Display each cart entry with details such as the cart ID, date of creation, and the total price of the order.
Enable users to click on individual orders to view the full details, including the list of products and the total price of the order.**

**Implementing Test-Driven Development (TDD) in React:
API Testing:
Write at least 2 different tests for your app where you Mock an API.
These can be Unit Tests and/or Integration Tests**

### Mocking API TDD Example:
```
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import FetchProducts from "../components/FetchProducts"; // Adjust the import path as necessary

jest.mock("axios");

describe("FetchProducts Component", () => {
  test("fetches and displays products", async () => {
    const products = [
      { id: 1, title: "Product 1" },
      { id: 2, title: "Product 2" },
    ];

    axios.get.mockResolvedValue({ data: products });

    render(<FetchProducts />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Product 1")).toBeInTheDocument();
      expect(screen.getByText("Product 2")).toBeInTheDocument();
    });
  });

  test("displays error message when API call fails", async () => {
    const errorMessage = "Network Error";

    axios.get.mockRejectedValue(new Error(errorMessage));

    render(<FetchProducts />);

    await waitFor(() => {
      expect(screen.getByText(`Error: ${errorMessage}`)).toBeInTheDocument();
    });
  });
});

```

(BONUS) Cart Integration Testing:
Write a test to check if adding an item to the cart updates the total price.
Simulate user interactions and assert resulting changes using React Testing Library for updating the cart total price.**

### Cart Integration TDD Example:
```
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Cart from "../components/Cart"; // Adjust the import path as necessary
import { deleteItem, initializeCart } from "../features/cartSlice"; 

const mockStore = configureStore([]);

describe("Cart Component", () => {
  test("displays products in the cart and handles item deletion", async () => {
    const initialState = {
      cart: {
        cart: [
          { id: 1, title: "Product 1", price: 100, quantity: 1 },
          { id: 2, title: "Product 2", price: 200, quantity: 2 }
        ],
        totalItems: 2,
        totalPrice: 500
      }
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    expect(screen.getByText("Total Items: 2")).toBeInTheDocument();
    expect(screen.getByText("Total Price: $500.00")).toBeInTheDocument();

    fireEvent.click(screen.getAllByText(/Delete/i)[0]);

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(deleteItem(1));
    });
  });

  test("initializes the cart with products", async () => {
    const initialState = {
      cart: {
        cart: [],
        totalItems: 0,
        totalPrice: 0
      }
    };

    const store = mockStore(initialState);
    store.dispatch = jest.fn();

    render(
      <Provider store={store}>
        <Cart />
      </Provider>
    );

    const items = [
      { id: 1, title: "Product 1", price: 100, quantity: 1 },
      { id: 2, title: "Product 2", price: 200, quantity: 2 }
    ];

    store.dispatch(initializeCart(items));

    await waitFor(() => {
      expect(store.dispatch).toHaveBeenCalledWith(initializeCart(items));
    });
  });
});

```