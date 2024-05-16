// src/Pages/ExistingCustomer.test.jsx
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import axios from "axios";
import ExistingCustomers from "./ExistingCustomers"; // Adjust the import path as necessary

jest.mock("axios");

const mockCustomers = [
  {
    id: "1",
    name: "John Doe",
    dob: "1990-01-01",
    email: "john@example.com",
    adharNumber: "123456789012",
    registrationDate: "2023-01-01",
    mobileNumber: "9876543210",
    plan: {
      planName: "Gold180",
      planCost: 299,
      validity: 180,
      planStatus: "Active",
    },
  },
  {
    id: "2",
    name: "Jane Doe",
    dob: "1992-02-02",
    email: "jane@example.com",
    adharNumber: "098765432109",
    registrationDate: "2023-02-02",
    mobileNumber: "8765432109",
    plan: {
      planName: "Platinum365",
      planCost: 499,
      validity: 365,
      planStatus: "Active",
    },
  },
];

describe("ExistingCustomers", () => {
  it("fetches and displays customers", async () => {
    axios.get.mockResolvedValue({ data: mockCustomers });

    render(<ExistingCustomers />);

    await waitFor(() =>
      expect(screen.getByText("Existing Customers")).toBeInTheDocument()
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Doe")).toBeInTheDocument();
  });

  it("displays an error message if fetching customers fails", async () => {
    axios.get.mockRejectedValue(new Error("Network Error"));

    render(<ExistingCustomers />);

    await waitFor(() =>
      expect(
        screen.getByText("Error while loading the data.")
      ).toBeInTheDocument()
    );
  });
});
