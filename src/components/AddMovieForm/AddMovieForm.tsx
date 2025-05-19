import { useNavigate } from "react-router-dom";
import Dialog from "../Dialog/Dialog";
import { Movie } from "../../models/Movie";
import MovieFormFormik from "../MovieForm/MovieFormFormik";

function AddMovieForm() {
    const navigate = useNavigate();

    const handleClose = () => {
        navigate('/');
    };

    const handleSubmit = async (movie: Movie) => {
        try {
            const response = await fetch('http://localhost:4000/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(movie),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error creating movie:', errorData);
                alert(`Error: ${errorData.message || 'Failed to create movie'}`);
                return; 
            }

            console.log('Movie successfully created!');
            handleClose();
        } catch (error) {
            console.error('Network error:', error);
            alert('Network error: Failed to create movie');
        }
    };

    return (
        <Dialog title="Add New Movie" onClose={handleClose}>
            {/* <MovieForm onSubmit={handleSubmit} /> */}
            <MovieFormFormik onSubmit={handleSubmit} />
        </Dialog>
    );
}

export default AddMovieForm;