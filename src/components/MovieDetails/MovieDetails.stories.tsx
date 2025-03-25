import './../../App.css';
import MovieDetails, { MovieDetailsProps } from './MovieDetails';

export default {
  title: "Movies/MovieDetails",  
  component: MovieDetails,       
};

// Template for the story
const Template = (args: MovieDetailsProps) => <MovieDetails {...args} />;

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
            "vote_average": 8.9,
            "overview": "Believing they have left behind shadowy figures from their past, newlyweds Christian and Ana fully embrace an inextricable connection and shared life of luxury. But just as she steps into her role as Mrs. Grey and he relaxes into an unfamiliar stability, new threats could jeopardize their happy ending before it even begins.",
            "runtime": 106
        },
    },
  };

