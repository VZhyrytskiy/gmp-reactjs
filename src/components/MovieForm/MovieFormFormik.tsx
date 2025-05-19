import { Movie } from "../../models/Movie";
import { genres } from "../../constants/constants";
import { runtimeService } from "../../services/runtimeService"; // Import the runtime service
import { useFormik } from "formik";
import * as Yup from "yup";

export interface MovieFormFormikProps {
    initialValues?: Movie;
    onSubmit: (movie: Movie) => void;
}

const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    release_date: Yup.string().required("Release Date is required"),
    poster_path: Yup.string()
        .url("Poster URL must be a valid URL")
        .required("Poster URL is required"),
    vote_average: Yup.number()
        .min(0, "Rating must be at least 0")
        .max(10, "Rating must be at most 10")
        .required("Rating is required"),
    genres: Yup.array()
        .min(1, "Select at least one genre")
        .required("Genres are required"),
    runtime: Yup.string().required("Runtime is required"),
    overview: Yup.string()
        .required("Overview is required")
        .min(10, "Overview must be at least 10 characters"),
});

const genreOptions = genres.map((genre) => ({
    value: genre,
    label: genre.charAt(0).toUpperCase() + genre.slice(1),
}));


function MovieFormFormik(props: MovieFormFormikProps) {
    const { initialValues, onSubmit } = props;

    const formik = useFormik({
        initialValues: {
                id: initialValues?.id || undefined,
                title: initialValues?.title || "",
                release_date: initialValues?.release_date || "",
                poster_path: initialValues?.poster_path || "",
                vote_average: initialValues?.vote_average || 0,
                genres: initialValues?.genres || [],
                runtime: runtimeService.formatRuntime(initialValues?.runtime) || "",
                overview: initialValues?.overview || "",
            },
        validationSchema,
        onSubmit: values => {
            let runtime: number = 0;
            if (values.runtime) {
                const runtimeString = values.runtime as unknown as string;
                runtime = runtimeService.convertRuntimeToMinutes(runtimeString); // Use the service method
            }
        
            const vote_average = +values.vote_average;
            const data: Movie = {...values, vote_average, runtime};

            console.log(data);
            onSubmit(data);
        },
    });

    return (
        <form className="bg-dark-gray" onSubmit={formik.handleSubmit}>
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
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        />
                        {formik.touched.title && formik.errors.title && (
                            <div className="text-red-500 text-sm">{formik.errors.title}</div>
                        )}
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
                        value={formik.values.release_date}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        />
                        {formik.touched.release_date && formik.errors.release_date && (
                            <div className="text-red-500 text-sm">{formik.errors.release_date}</div>
                        )}
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
                        value={formik.values.poster_path}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        />
                        {formik.touched.poster_path && formik.errors.poster_path && (
                            <div className="text-red-500 text-sm">{formik.errors.poster_path}</div>
                        )}
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
                        value={formik.values.vote_average}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        />
                        {formik.touched.vote_average && formik.errors.vote_average && (
                            <div className="text-red-500 text-sm">{formik.errors.vote_average}</div>
                        )}
                </div>
            </div>

            <div className="flex flex-row gap-8 mt-8">
                <div className="flex flex-col">
                    <label htmlFor="genre" className="text-red-accent uppercase">
                        Genre
                    </label>
                    <select
                        id="genres"
                        name="genres"
                        multiple
                        className="min-w-[525px] bg-gray text-white p-2 rounded mt-2"
                        value={formik.values.genres}
                        onChange={(event: React.ChangeEvent<HTMLSelectElement>) => {
                            const selectedOptions = Array.from(
                                event.target.selectedOptions,
                                (option) => option.value
                            );
                            formik.setFieldValue("genres", selectedOptions);
                        }}
                        onBlur={formik.handleBlur}
                    >
                        {genreOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {formik.touched.genres && formik.errors.genres && (
                        <div className="text-red-500 text-sm">{formik.errors.genres}</div>
                    )}
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
                        value={formik.values.runtime}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        />
                        {formik.touched.runtime && formik.errors.runtime && (
                            <div className="text-red-500 text-sm">{formik.errors.runtime}</div>
                        )}
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
                        value={formik.values.overview}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        required
                        />
                        {formik.touched.overview && formik.errors.overview && (
                            <div className="text-red-500 text-sm">{formik.errors.overview}</div>
                        )}
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

export default MovieFormFormik;