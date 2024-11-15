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

