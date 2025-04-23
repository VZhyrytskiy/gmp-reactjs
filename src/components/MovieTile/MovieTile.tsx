import { useRef } from "react";
import { Movie } from "../../models/Movie";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface MovieTileProps {
    movie: Movie;
}

function MovieTile(props: MovieTileProps) {
    const {movie: {poster_path, title, release_date, genres, id}} = props;

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const detailsRef = useRef<HTMLDetailsElement>(null);

    const closeDropdown = (message: string ) => () => {
        console.log(message);
        if (detailsRef.current) {
            detailsRef.current.open = false; 
        }
    };

    const handleClick = () => {
        navigate(`/${id}`, { state: { searchParams: searchParams.toString() } });
    };

    return (
        <div className="w-[322px] bg-gray relative text-white pt-8">
            {/* POSTER */}
            <img src={poster_path} alt={title} onClick={handleClick} className="min-w-[322px] min-h-[455px] cursor-pointer" />
            
            {/* POPUP MENU */}
            <details ref={detailsRef} className="dropdown absolute top-9 right-2">
                <summary className="btn rounded-full w-9 h-9 cursor-pointer bg-gray border-none text-white">
                    <div className="text-center rotate-90 translate-x-1/3 cursor-pointer">...</div>
                </summary>
                <div className="menu dropdown-content bg-gray capitalize rounded-box z-1 w-52 shadow-sm">
                <div className="text-right" onClick={closeDropdown('x')}>X</div>
                    <ul>
                        <li className="hover:bg-red-accent"><a onClick={closeDropdown('Edit')}>edit</a></li>
                        <li className="hover:bg-red-accent"><a onClick={closeDropdown('Delete')}>delete</a></li>
                    </ul>
                </div>
            </details>
            
            {/* TITLE & YEAR */}
            <div className="mt-4 mx-1 flex justify-between">
                <h2 className="text-lg/100% font-medium opacity-70">{title}</h2>
                <div className="w-[66px] text-center text-sm rounded-sm border border-lighter-gray opacity-50" >{release_date.split("-")[0]}</div>
            </div>

            {/* GENRES */}
            <div className="font-medium text-sm mt-1 mx-1 opacity-50">
                {genres.join(', ')}
            </div>
        </div>
    )
}

export default MovieTile;