import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MovieTile, { MovieTileProps } from "./MovieTile";
import { describe, it, vi, expect } from "vitest";
import { mockMovie } from "../../mock-data";

const navigateSpy = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom"); // Импортируем все оригинальные фичи react-router-dom
  return {
    ...actual,
    useNavigate: () => navigateSpy, // Заменяем useNavigate на мок
  };
});



describe("MovieTile Component", () => {
  const defaultProps: MovieTileProps = {
    movie: mockMovie,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders movie poster, title, release date, and genres", () => {
    render(
      <MemoryRouter>
        <MovieTile {...defaultProps} />
      </MemoryRouter>
    );

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

  it("navigates to the correct path when poster is clicked", () => {
    render(
      <MemoryRouter>
        <MovieTile {...defaultProps} />
      </MemoryRouter>
    );

    const poster = screen.getByAltText(mockMovie.title);
    fireEvent.click(poster);

    expect(navigateSpy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(`/${mockMovie.id}`, {
      state: { searchParams: "" }, 
    });
  });

  it("opens and closes the dropdown menu", () => {
    render(
      <MemoryRouter>
        <MovieTile {...defaultProps} />
      </MemoryRouter>
    );

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
    render(
      <MemoryRouter>
        <MovieTile {...defaultProps} />
      </MemoryRouter>
    );

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