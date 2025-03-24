import { Movie } from "../../models/Movie";

export interface MovieDetailsProps {
    movie: Movie;
}

function MovieDetails(props: MovieDetailsProps) {
    const { poster_path, title, release_date, genres, vote_average, overview, runtime } = props.movie;

    const getHoursAndMinutes = (runtime: number) => {
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}min`;
    };

    return (
        <div className="w-full bg-gray text-white flex gap-4">
            {/* LEFT SIDE */}
            <div className="w-[322px] bg-gray relative text-white">
                {/* POSTER */}
                <img src={poster_path} alt={title} className="min-w-[322px] min-h-[455px] cursor-pointer" />
            </div>
            
            {/* RIGHT SIDE */}
            <div className="flex flex-col">
                {/* TITLE & Rating */}
                <div className="mt-4 flex gap-8">
                    <h2 className="text-5xl font-medium opacity-70">{title}</h2>
                    <div className="flex items-center justify-center text-xl font-medium opacity-70 ml-4 rounded-full border-white border w-[60px] h-[60px]">{vote_average}</div>
                </div>

                {/* GENRES */}
                <div className="font-medium text-sm mt-1 opacity-50">
                    {genres.join(', ')}
                </div>

                {/* YEAR & DURATION */}
                <div className="flex flex-row gap-12 mt-4">
                    <div className="text-red-accent">{release_date.split("-")[0]}</div>
                    <div className="text-red-accent">{getHoursAndMinutes(runtime)}</div>
                </div>

                {/* OVERVIEW */}
                <div className="mt-4 opacity-70">
                    {overview}
                </div>

            </div>
        </div>
        
        
    )
}

export default MovieDetails;