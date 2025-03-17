import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // ??? Що це за імпорт? Чому він вирішує проблему у всіх тестах?
import Counter from "./Counter";

describe("Counter Component", () => {
  test("renders initial value provided in props", () => {
    render(<Counter />);
    const valueElement = screen.getByText(/Value: 0/i);

    expect(valueElement).toBeInTheDocument();
  });

  test('clicking "decrement" button decrements the displayed value', () => {
    render(<Counter />);
    const decrementButton = screen.getByText(/Decrement/i);
    fireEvent.click(decrementButton);

    const valueElement = screen.getByText(/Value: -1/i);
    expect(valueElement).toBeInTheDocument();
  });

  test('clicking "increment" button increments the displayed value', () => {
    render(<Counter />);
    const incrementButton = screen.getByText(/Increment/i);
    fireEvent.click(incrementButton);

    const valueElement = screen.getByText(/Value: 1/i);
    expect(valueElement).toBeInTheDocument();
  });
});