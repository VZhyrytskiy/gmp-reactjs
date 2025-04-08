import { Movie } from "../../models/Movie";
import { genres } from "../../constants/constants";
import { runtimeService } from "../../services/runtimeService"; // Import the runtime service
import { processFormData } from "../../services/formDataProcessor";
import { useState } from "react";

export interface MovieFormProps {
    initialValues?: Movie;
    onSubmit: (movie: Movie) => void;
}

function MovieForm(props: MovieFormProps) {
    const { initialValues, onSubmit } = props;

    const [selectedGenres, setSelectedGenres] = useState<string[]>(
        initialValues?.genres || []
    );

    const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(
            (option) => option.value
        );
        setSelectedGenres(selectedOptions);
    };

    const genreOptions = genres.map((genre) => ({
        value: genre,
        label: genre.charAt(0).toUpperCase() + genre.slice(1),
    }));

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const data = processFormData(formData);

        // Add selected genres to the data
        data.genres = selectedGenres;

        console.log(data);
        onSubmit(data);
    };

    return (
        <form className="bg-dark-gray" onSubmit={handleSubmit}>
            <div className="flex flex-row gap-8 mt-8">
                <div className="flex flex-col">
                    <label htmlFor="title" className="text-red-accent uppercase">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        className="min-w-[525px] bg-gray text-white p-2 rounded mt-2"
                        placeholder="Movie title"
                        defaultValue={initialValues?.title || ""}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="release_date" className="text-red-accent uppercase">
                        Release Date
                    </label>
                    <input
                        type="date"
                        id="release_date"
                        name="release_date"
                        className="min-w-[301px] bg-gray text-white p-2 rounded mt-2"
                        defaultValue={initialValues?.release_date || ""}
                        required
                    />
                </div>
            </div>

            <div className="flex flex-row gap-8 mt-8">
                <div className="flex flex-col">
                    <label htmlFor="poster_path" className="text-red-accent uppercase">
                        Movie URL
                    </label>
                    <input
                        type="text"
                        id="poster_path"
                        name="poster_path"
                        className="min-w-[525px] bg-gray text-white p-2 rounded mt-2"
                        placeholder="Movie Poster"
                        defaultValue={initialValues?.poster_path || ""}
                        required
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="vote_average" className="text-red-accent uppercase">
                        Rating
                    </label>
                    <input
                        type="text"
                        id="vote_average"
                        name="vote_average"
                        className="min-w-[301px] bg-gray text-white p-2 rounded mt-2"
                        placeholder="Rating"
                        defaultValue={initialValues?.vote_average?.toString() || ""}
                        required
                    />
                </div>
            </div>

            <div className="flex flex-row gap-8 mt-8">
                <div className="flex flex-col">
                    <label htmlFor="genre" className="text-red-accent uppercase">
                        Genre
                    </label>
                    <select
                        id="genre"
                        name="genre"
                        multiple
                        value={selectedGenres}
                        onChange={handleGenreChange}
                        className="min-w-[525px] bg-gray text-white p-2 rounded mt-2"
                    >
                        {genreOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex flex-col">
                    <label htmlFor="runtime" className="text-red-accent uppercase">
                        Runtime
                    </label>
                    <input
                        type="text"
                        id="runtime"
                        name="runtime"
                        className="min-w-[301px] bg-gray text-white p-2 rounded mt-2"
                        placeholder="Runtime"
                        defaultValue={runtimeService.formatRuntime(initialValues?.runtime)}
                        required
                    />
                </div>
            </div>

            <div className="flex flex-row mt-8">
                <div className="flex flex-col w-full">
                    <label htmlFor="overview" className="text-red-accent uppercase">
                        Overview
                    </label>
                    <textarea
                        id="overview"
                        name="overview"
                        rows={5}
                        className="bg-gray text-white p-2 rounded mt-2"
                        placeholder="Overview"
                        defaultValue={initialValues?.overview || ""}
                        required
                    />
                </div>
            </div>

            <div className="flex flex-row justify-end mt-8 gap-4">
                <button
                    type="reset"
                    className="text-lg cursor-pointer w-[182px] text-red-accent border-red-accent border-1 uppercase"
                >
                    Reset
                </button>
                <button
                    type="submit"
                    className="text-lg cursor-pointer w-[182px] bg-red-accent p-2 rounded uppercase"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}

export default MovieForm;