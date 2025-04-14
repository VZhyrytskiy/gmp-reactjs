import { useEffect, useState } from "react";
import SearchForm from "../../components/SearchForm/SearchForm";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import GenreSelect from "../../components/GenreSelect/GenreSelect";
import { genres } from './../../constants/constants';
import { SortControl } from "../../components/SortControl/SortControl";
import { movies } from './../../mock-data/mockMovies';
import MovieTile from "../../components/MovieTile/MovieTile";
import { Movie } from "../../models/Movie";

function buildQueryParams(paramsObject: { [index: string]: string }): string {
    const params = Object.keys(paramsObject)
        .filter(key => paramsObject[key] !== 'all' && paramsObject[key] !== '')
        .map(key => `${key}=${encodeURIComponent(paramsObject[key])}`);

    return `?${params.join('&')}`;
}

function MovieListPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [sortCriterion, setSortCriterion] = useState('release_date');
    const [activeGenre, setActiveGenre] = useState('all');
    const [movieList, setMovieList] = useState(movies);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

    useEffect(() => {
        const abortController = new AbortController(); 
        const signal = abortController.signal; 

         (async () => {
            try {
                const paramsObject: { [index: string]: string } = {
                    search: searchQuery,
                    sortBy: sortCriterion,
                    filter: activeGenre,
                    searchBy: 'title',
                    sortOrder: 'desc'
                };

                const queryParams = buildQueryParams(paramsObject);

                const response = await fetch(`http://localhost:4000/movies${queryParams}`, { signal });
                
                if (response.ok) {
                    const data = await response.json();
                    setMovieList(data); 
                } else {
                    console.error('Error fetching movies:', response.statusText);
                }
            } catch (error) {
                if ((error as Error).name === 'AbortError') {
                    console.log('Fetch request aborted');
                } else {
                    console.error('Error fetching movies:', error);
                }
            }
        })();

        return () => {
            abortController.abort();
        };

    }, [searchQuery, sortCriterion, activeGenre]);

    return (
        <section className="max-w-5xl">
            {selectedMovie
                ? <MovieDetails movie={selectedMovie} onSearch={() => setSelectedMovie(null) } />
                : <SearchForm searchQuery={searchQuery} onSearch={setSearchQuery} />
            }

            <div className='flex flex-row justify-between'>
                <GenreSelect genre={genres} selectedGenre={activeGenre} onSelect={setActiveGenre} />
                <SortControl currentSelection={sortCriterion} onSelectionChange={setSortCriterion} />
            </div>

            <div className="flex flex-wrap gap-4 justify-center bg-gray">
                {movieList.data.map((movie: Movie) => {
                        return (
                            <MovieTile key={movie.title} movie={movie} callback={() => setSelectedMovie(movie)} />
                        );
                    })
                }
            </div>
        </section>
    )
}

export default MovieListPage;