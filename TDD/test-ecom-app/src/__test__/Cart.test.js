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
