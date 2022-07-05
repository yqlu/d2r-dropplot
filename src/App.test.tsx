import { render, screen } from "@testing-library/react";
import React from "react";
import App from "./App";

test("renders page", () => {
  render(<App />);
  const linkElement = screen.getByText(/Magic Find/i);
  expect(linkElement).toBeInTheDocument();
});
