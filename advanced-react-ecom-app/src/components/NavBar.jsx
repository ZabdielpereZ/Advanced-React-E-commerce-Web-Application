import React from 'react';
import { Container, Navbar, Nav, Badge } from 'react-bootstrap';
import { Link,  useNavigate } from 'react-router-dom';
import { Cart4 } from 'react-bootstrap-icons';
import { useSelector } from 'react-redux';


const NavBar = () => {
  const navigate = useNavigate();
  // selecting the state we want to use and then grabbing the variable(s) from the state 
  const { totalItems } = useSelector((state) => state.cart);

  return (
    <Container>
      <Navbar bg="warning" data-bs-theme="warning">
        <Container>
          <Navbar.Brand >Advanced React E-com App</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/products">Products</Nav.Link>
            <Container onClick={() => navigate ("cart")} className='mt-1'>
              <Cart4 color='blue' />
              <Badge bg='primary'>{totalItems}</Badge>
            </Container>
          </Nav>
        </Container>
      </Navbar>
    </Container>
  );
};

export default NavBar;
