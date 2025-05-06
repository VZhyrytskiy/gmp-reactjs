import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; 
import SearchForm from "./SearchForm";
import { describe, it, expect } from "vitest";

describe("SearchForm Component", () => {
  it("renders an input with the value equal to query from URL", () => {
    render(
      <MemoryRouter initialEntries={["/?query=Initial%20Search%20Query"]}>
        <SearchForm />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText("What do you want to watch?");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue("Initial Search Query");
  });

  it("updates the query parameter when typing and clicking Submit button", () => {
    render(
      <MemoryRouter initialEntries={["/?query=Old%20Query"]}>
        <SearchForm />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText("What do you want to watch?");
    const submitButton = screen.getByText("Search");

    fireEvent.change(inputElement, { target: { value: "New Search Query" } });
    fireEvent.click(submitButton);

    expect(inputElement).toHaveValue("New Search Query");
  });

  it("updates the query parameter when pressing Enter key in the input", () => {
    render(
      <MemoryRouter initialEntries={["/?query=Old%20Query"]}>
        <SearchForm />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText("What do you want to watch?");

    fireEvent.change(inputElement, { target: { value: "Another Search Query" } });
    fireEvent.submit(inputElement.closest("form")!);

    expect(inputElement).toHaveValue("Another Search Query");
  });
});