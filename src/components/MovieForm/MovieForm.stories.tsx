import { Meta, StoryFn } from "@storybook/react";
import MovieForm, { MovieFormProps } from "./MovieForm";
import { Movie } from "../../models/Movie";

// Mock data for the initial values
const mockMovie: Movie = {
    title: "Inception",
    release_date: "2010-07-16",
    poster_path: "https://example.com/inception.jpg",
    vote_average: 8.8,
    genres: ["Action", "Sci-Fi"],
    runtime: 148,
    overview: "A thief who steals corporate secrets through the use of dream-sharing technology.",
};

export default {
    title: "Movies/MovieForm",
    component: MovieForm,
    argTypes: {
        onSubmit: { action: "submitted" }, 
    },
} as Meta;

const Template: StoryFn<MovieFormProps> = (args: MovieFormProps) => <MovieForm {...args} />;


export const Default = {
    render: Template,
    args: {
        initialValues: mockMovie,
        onSubmit: (movie: Movie) => console.log("Submitted movie:", movie),
    }
};

export const EmptyForm = {
    render: Template,
    args: {
        initialValues: undefined, // No initial values
        onSubmit: (movie: Movie) => console.log("Submitted movie:", movie),
    }
};