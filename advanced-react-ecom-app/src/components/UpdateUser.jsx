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
