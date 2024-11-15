import React from 'react';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap'; 
import Home from './components/Home';
import Products from './components/Products';
import NavBar from './components/NavBar';
import UserRegistration from './components/UserRegistration';
import UpdateUser from './components/UpdateUser';
import DeleteUser from './components/DeleteUser';
import store from './store';
import Cart from './components/Cart';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <NavBar />
        <Container>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path='/cart' element={<Cart />} />
            <Route path="/register" element={<UserRegistration />} />
            <Route path="/update-user" element={<UpdateUser />} />
            <Route path="/delete-user" element={<DeleteUser />} />
          </Routes>
        </Container>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
