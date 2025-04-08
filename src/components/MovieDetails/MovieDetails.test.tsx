import { render, screen } from "@testing-library/react";
import MovieDetails, { MovieDetailsProps } from "./MovieDetails";
import { describe, it, expect } from "vitest";
import { mockMovie } from "../../mock-data";

describe("MovieDetails Component", () => {
  const defaultProps: MovieDetailsProps = {
    movie: mockMovie,
  };

  it("renders movie poster, title, rating, genres, release year, runtime, and overview", () => {
    render(<MovieDetails {...defaultProps} />);

    // check if the poster is rendered
    const poster = screen.getByAltText(mockMovie.title);
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute("src", mockMovie.poster_path);

    // check if the title is rendered
    const title = screen.getByText(mockMovie.title);
    expect(title).toBeInTheDocument();

    // check if the rating is rendered
    const rating = screen.getByText(mockMovie.vote_average.toString());
    expect(rating).toBeInTheDocument();

    // check if the genres are rendered
    const genres = screen.getByText("documentary, comedy");
    expect(genres).toBeInTheDocument();

    // check if the release year is rendered
    const releaseYear = screen.getByText("2025");
    expect(releaseYear).toBeInTheDocument();

    // check if the runtime is rendered
    const runtime = screen.getByText("2h 5min"); // 125 minutes = 2h 5min
    expect(runtime).toBeInTheDocument();

    // check if the overview is rendered
    const overview = screen.getByText(mockMovie.overview);
    expect(overview).toBeInTheDocument();
  });
});