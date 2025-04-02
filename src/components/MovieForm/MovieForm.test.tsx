import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Import userEvent
import { describe, it, expect } from "vitest";
import MovieForm from "./MovieForm";
import { Movie } from "../../models/Movie";
import { mockOnSubmit } from "../../mock-data";

const getFormElements = () => {
    const titleInput = screen.getByLabelText(/title/i) as HTMLInputElement;
    const releaseDateInput = screen.getByLabelText(/release date/i) as HTMLInputElement;
    const movieUrlInput = screen.getByLabelText(/movie url/i) as HTMLInputElement;
    const ratingInput = screen.getByLabelText(/rating/i) as HTMLInputElement;
    const runtimeInput = screen.getByLabelText(/runtime/i) as HTMLInputElement;
    const overviewInput = screen.getByLabelText(/overview/i) as HTMLInputElement;
    const genreSelect = screen.getByLabelText(/genre/i);
    const submitButton = screen.getByRole("button", { name: /submit/i });
    const resetButton = screen.getByRole("button", { name: /reset/i });

    return {
        titleInput,
        releaseDateInput,
        movieUrlInput,
        ratingInput,
        runtimeInput,
        overviewInput,
        genreSelect,
        submitButton,
        resetButton
    };
};

const initialValues: Movie = {
    title: "Inception",
    release_date: "2010-07-16",
    poster_path: "https://example.com/poster.jpg",
    vote_average: 8.8,
    genres: ["action", "sci-fi"],
    runtime: 148,
    overview: "A mind-bending thriller.",
};

describe("MovieForm Component", () => {
    beforeEach(() => {
        mockOnSubmit.mockClear();
    });

    it("renders correctly without initial values", () => {
        render(<MovieForm onSubmit={mockOnSubmit} />);
        const { titleInput, releaseDateInput, movieUrlInput, ratingInput, runtimeInput, overviewInput, genreSelect } = getFormElements();

        expect(titleInput).toHaveValue("");
        expect(releaseDateInput).toHaveValue("");
        expect(movieUrlInput).toHaveValue("");
        expect(ratingInput).toHaveValue("");
        expect(runtimeInput).toHaveValue("");
        expect(overviewInput).toHaveValue("");
        expect(genreSelect).toHaveValue([]);
    });

    it("renders correctly with initial values", () => {
        render(<MovieForm initialValues={initialValues} onSubmit={mockOnSubmit} />);
        const { titleInput, releaseDateInput, movieUrlInput, ratingInput, runtimeInput, overviewInput, genreSelect } = getFormElements();

        expect(titleInput).toHaveValue("Inception");
        expect(releaseDateInput).toHaveValue("2010-07-16");
        expect(movieUrlInput).toHaveValue("https://example.com/poster.jpg");
        expect(ratingInput).toHaveValue("8.8");
        expect(runtimeInput).toHaveValue("2h 28min");
        expect(overviewInput).toHaveValue("A mind-bending thriller.");
        expect(genreSelect).toHaveValue(["action", "sci-fi"]);
    });

    it("calls onSubmit with correct data when the form is submitted", async () => {
        const user = userEvent.setup();
        render(<MovieForm initialValues={initialValues} onSubmit={mockOnSubmit} />);
        const { submitButton } = getFormElements();

        await user.click(submitButton); 

        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
            title: "Inception",
            release_date: "2010-07-16",
            poster_path: "https://example.com/poster.jpg",
            vote_average: 8.8,
            genres: ["action", "sci-fi"],
            runtime: 148,
            overview: "A mind-bending thriller.",
        });
    });

    it("resets the form fields when the reset button is clicked", async () => {
        const user = userEvent.setup();
        render(<MovieForm initialValues={initialValues} onSubmit={mockOnSubmit} />);
        const { titleInput, resetButton } = getFormElements();
        
        await user.type(titleInput, 'AAA');
        await user.click(resetButton);

        expect(titleInput).toHaveValue("Inception"); 
    });

    
});