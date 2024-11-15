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
