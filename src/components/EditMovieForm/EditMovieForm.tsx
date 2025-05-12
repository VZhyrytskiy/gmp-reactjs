import { useLocation, useNavigate } from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import { Movie } from "../../models/Movie";
import MovieFormFormik from "../MovieForm/MovieFormFormik";

function EditMovieForm() {
    const navigate = useNavigate();
    const location = useLocation();

    // get the movie from the location state
    const movie = location.state?.movie;

    const handleClose = () => {
        navigate('/'); 
    };

    const handleSubmit = async (updatedMovie: Movie) => {
        try {
            const response = await fetch('http://localhost:4000/movies', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMovie),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error updating movie:', errorData);
                alert(`Error: ${errorData.message || 'Failed to update movie'}`);
                return;
            }

            console.log('Movie successfully updated!');
            handleClose();
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error: Failed to update movie');
        }
    };

    return (
        <Dialog title="Edit Movie" onClose={handleClose}>
            <MovieFormFormik initialValues={movie} onSubmit={handleSubmit} />
        </Dialog>
    );
}

export default EditMovieForm;