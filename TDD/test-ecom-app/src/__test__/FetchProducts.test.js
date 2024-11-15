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
