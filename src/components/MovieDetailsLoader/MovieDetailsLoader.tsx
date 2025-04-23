import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie } from "../../models/Movie";
import MovieDetails from "../MovieDetails/MovieDetails";

export function MovieDetailsLoader() {
    const { movieId } = useParams();
  
    const [movie, setMovie] = useState<Movie | null>(null);
  
    useEffect(() => {
        const fetchMovie = async () => {
            try {
                const response = await fetch(`http://localhost:4000/movies/${movieId}`);
                if (response.ok) {
                    const data = await response.json();
                    setMovie(data);
                } else {
                    console.error('Error fetching movie:', response.statusText);
                }
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        };
  
        fetchMovie();
    }, [movieId]);
  
    if (!movie) {
        return <p>Loading...</p>;
    }
  
    return <MovieDetails movie={movie} />;
  }