import { createSlice } from "@reduxjs/toolkit"

// Set up our initial state
const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) || [], // Ensure this is always an array
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
