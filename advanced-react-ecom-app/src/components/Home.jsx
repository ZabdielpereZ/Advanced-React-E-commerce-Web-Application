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
