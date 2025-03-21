import { render, screen, fireEvent } from "@testing-library/react";
import GenreSelect from "./GenreSelect";
import { vi } from "vitest";

const genres = ['all', 'documentary', 'comedy', 'horror', 'crime'];
const mockOnSelect = vi.fn();

describe("GenreSelect Component", () => {
  test("renders all genres passed in props", () => {
    render(
      <GenreSelect
        genre={genres}
        selectedGenre=""
        onSelect={mockOnSelect}
      />
    );

    genres.forEach((genre) => {
      const genreElement = screen.getByText(genre);
      expect(genreElement).toBeInTheDocument();
    });
  });

  test("highlights a selected genre passed in props", () => {
    const selectedGenre = "comedy";

    render(
      <GenreSelect
        genre={genres}
        selectedGenre={selectedGenre}
        onSelect={mockOnSelect}
      />
    );

    const selectedGenreElement = screen.getByText(selectedGenre);
    expect(selectedGenreElement).toHaveClass("selected");

    genres
      .filter((genre) => genre !== selectedGenre)
      .forEach((genre) => {
        const genreElement = screen.getByText(genre);
        expect(genreElement).not.toHaveClass("selected");
      });
  });

  test('calls "onSelect" callback with correct genre after click event', () => {
    render(
      <GenreSelect
        genre={genres}
        selectedGenre=""
        onSelect={mockOnSelect}
      />
    );

    const genreElement = screen.getByText("documentary");
    fireEvent.click(genreElement);

    expect(mockOnSelect).toHaveBeenCalledTimes(1);
    expect(mockOnSelect).toHaveBeenCalledWith("documentary");
  });
});