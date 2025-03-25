import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SortControl, SortControlProps } from "./SortControl";
import { mockOnSelectionChange } from "../../mock-data";

describe("SortControl Component", () => {

  const defaultProps: SortControlProps = {
    currentSelection: "RELEASE DATE",
    onSelectionChange: mockOnSelectionChange,
  };

  it("renders correctly with the current selection", () => {
    render(<SortControl {...defaultProps} />);

    // check if the label "Sort by" is rendered
    const label = screen.getByText("Sort by");
    expect(label).toBeInTheDocument();

    // check if the select is rendered with the correct value
    const select = screen.getByRole("combobox");
    expect(select).toBeInTheDocument();
    expect(select).toHaveValue("RELEASE DATE");

    // check if the options are rendered
    const options = screen.getAllByRole("option");
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent("RELEASE DATE");
    expect(options[1]).toHaveTextContent("TITLE");
  });

  it("calls onSelectionChange when the selection changes", () => {
    render(<SortControl {...defaultProps} />);

    const select = screen.getByRole("combobox");

    // change the value of the <select>
    fireEvent.change(select, { target: { value: "TITLE" } });

    // check if `onSelectionChange` was called with the new value
    expect(mockOnSelectionChange).toHaveBeenCalledTimes(1);
    expect(mockOnSelectionChange).toHaveBeenCalledWith("TITLE");
  });

  it("renders with a different initial selection", () => {
    const props: SortControlProps = {
      currentSelection: "TITLE",
      onSelectionChange: mockOnSelectionChange,
    };

    render(<SortControl {...props} />);

    // Check that the value of `<select>` matches `currentSelection`
    const select = screen.getByRole("combobox");
    expect(select).toHaveValue("TITLE");
  });
});