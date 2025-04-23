import { Meta, StoryFn } from "@storybook/react";
import MovieTile, { MovieTileProps } from "./MovieTile";
import { MemoryRouter } from "react-router-dom";
import './../../App.css';

export default {
  title: "Movies/MovieTile",  
  component: MovieTile,       // Component for which the story is created
} as Meta;

// Template for the story
const Template: StoryFn<MovieTileProps> = (args: MovieTileProps) => (
    <MemoryRouter>
      <MovieTile {...args} />
    </MemoryRouter>
  );

// Story with an empty field
export const Default = {
    render: Template,
    args: {
        movie: {
            "id": 337167,
            "title": "Fifty Shades Freed",
            "release_date": "2018-02-07",
            "poster_path": "https://image.tmdb.org/t/p/w500/3kcEGnYBHDeqmdYf8ZRbKdfmlUy.jpg",
            "genres": [
                "Drama",
                "Romance"
            ],
        },
    },
  };

