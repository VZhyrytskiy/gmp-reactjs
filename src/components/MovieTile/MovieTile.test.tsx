import { render, screen, fireEvent } from "@testing-library/react";
import MovieTile, { MovieTileProps } from "./MovieTile";
import { describe, it, vi, expect } from "vitest";
import { mockCallback, mockMovie } from "../../mock-data";

describe("MovieTile Component", () => {
  const defaultProps: MovieTileProps = {
    movie: mockMovie,
    callback: mockCallback,
  };

  it("renders movie poster, title, release date, and genres", () => {
    render(<MovieTile {...defaultProps} />);

    // chaeck if the poster is rendered
    const poster = screen.getByAltText(mockMovie.title);
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute("src", mockMovie.poster_path);

    // check if the title is rendered
    const title = screen.getByText(mockMovie.title);
    expect(title).toBeInTheDocument();

    // check if the release year is rendered
    const releaseYear = screen.getByText("2025");
    expect(releaseYear).toBeInTheDocument();

    // check if the genres are rendered
    const genres = screen.getByText("documentary, comedy");
    expect(genres).toBeInTheDocument();
  });

  it("calls callback when poster is clicked", () => {
    render(<MovieTile {...defaultProps} />);

    const poster = screen.getByAltText(mockMovie.title);
    fireEvent.click(poster);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("opens and closes the dropdown menu", () => {
    render(<MovieTile {...defaultProps} />);

    const dropdownButton = screen.getByText("...");
    const dropdownDetails = screen.getByRole("group", { hidden: true });

    // check if the dropdown is closed by default
    expect(dropdownDetails).not.toBeVisible();

    // open the dropdown
    fireEvent.click(dropdownButton);
    expect(dropdownDetails).toBeVisible();

    // close the dropdown
    const closeButton = screen.getByText("X");
    fireEvent.click(closeButton);
    expect(dropdownDetails).not.toBeVisible();
  });

  it("calls closeDropdown with the correct message", () => {
    render(<MovieTile {...defaultProps} />);

    // click on the "edit" button
    const editButton = screen.getByText("edit");
    fireEvent.click(editButton);

    // check if the message "Edit" is logged to the console (or called)
    // to do this, mock `console.log`.
    const logSpy = vi.spyOn(console, "log");
    fireEvent.click(editButton);
    expect(logSpy).toHaveBeenCalledWith("Edit");

    // check if the message "Delete" is logged to the console (or called)
    const deleteButton = screen.getByText("delete");
    fireEvent.click(deleteButton);
    expect(logSpy).toHaveBeenCalledWith("Delete");
  });
});