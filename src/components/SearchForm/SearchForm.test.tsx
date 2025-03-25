import { render, screen, fireEvent } from "@testing-library/react";
import SearchForm from "./SearchForm";
import { vi } from "vitest";

describe("SearchForm Component", () => {
  test("renders an input with the value equal to initial value passed in props", () => {
    const mockOnSearch = vi.fn();
    const initialValue = "Initial Search Query";
    render(<SearchForm searchQuery={initialValue} onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("What do you want to watch?");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveValue(initialValue);
  });

  test('calls "onSearch" prop with proper value after typing and clicking Submit button', () => {
    const mockOnSearch = vi.fn();
    const initialValue = "Initial Search Query";

    render(<SearchForm searchQuery={initialValue} onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("What do you want to watch?");
    const submitButton = screen.getByText("Search");

    fireEvent.change(inputElement, { target: { value: "New Search Query" } });
    fireEvent.click(submitButton);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("New Search Query");
  });

  test('calls "onSearch" prop with proper value after typing and pressing Enter key', () => {
    const mockOnSearch = vi.fn();
    const initialValue = "Initial Search Query";

    render(<SearchForm searchQuery={initialValue} onSearch={mockOnSearch} />);

    const inputElement = screen.getByPlaceholderText("What do you want to watch?");

    fireEvent.change(inputElement, { target: { value: "Another Search Query" } });
    fireEvent.submit(inputElement.closest("form")!);

    expect(mockOnSearch).toHaveBeenCalledTimes(1);
    expect(mockOnSearch).toHaveBeenCalledWith("Another Search Query");
  });
});