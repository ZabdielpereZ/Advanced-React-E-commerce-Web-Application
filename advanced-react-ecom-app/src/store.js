import { configureStore, createReducer } from '@reduxjs/toolkit';
import cartReducer from './features/cartSlice'

// initialize our redux store with configureStore 
export const store = configureStore({
  reducer: {
    cart: cartReducer
  },
});

export default store;