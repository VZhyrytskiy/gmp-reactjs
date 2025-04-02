import { Movie } from "../models/Movie";

export const mockMovie: Movie = {
    poster_path: "test-poster.jpg",
    title: "Test Movie",
    release_date: "2025-01-01",
    genres: ['documentary', 'comedy'],
    vote_average: 8.5,
    overview: "This is a test movie overview.",
    runtime: 125,
};