import { useEffect, useState } from "react";
import GenreSelect from "../../components/GenreSelect/GenreSelect";
import { genres } from './../../constants/constants';
import { SortControl } from "../../components/SortControl/SortControl";
import { movies } from './../../mock-data/mockMovies';
import MovieTile from "../../components/MovieTile/MovieTile";
import { Movie } from "../../models/Movie";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";

function buildQueryParams(paramsObject: { [index: string]: string }): string {
    const params = Object.keys(paramsObject)
        .filter(key => paramsObject[key] !== 'all' && paramsObject[key] !== '')
        .map(key => `${key}=${encodeURIComponent(paramsObject[key])}`);

    return `?${params.join('&')}`;
}

function MovieListPage() {
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();

    // start initialization of state variables
    const [searchQuery, setSearchQuery] = useState(searchParams.get('query') ?? '');
    const [sortCriterion, setSortCriterion] = useState(searchParams.get('sortBy') ?? 'release_date');
    const [activeGenre, setActiveGenre] = useState(searchParams.get('filter') ?? 'all');
    const [movieList, setMovieList] = useState(movies);

    useEffect(() => {
        if (location.state?.searchParams) {
          const newParams = new URLSearchParams(location.state.searchParams);
          setSearchParams(newParams);
        }
    }, [location.state, setSearchParams]);

    // update the state variables when the searchParams change 
    useEffect(() => {
        setSearchQuery(searchParams.get('query') ?? '');
        setSortCriterion(searchParams.get('sortBy') ?? 'release_date');
        setActiveGenre(searchParams.get('filter') ?? 'all');
    }, [searchParams]);


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


    const updateSearchParams = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        newParams.set(key, value);
        setSearchParams(newParams);
    };

    const handleSortChange = (value: string) => {
        setSortCriterion(value);
        updateSearchParams('sortBy', value);
    };

    const handleFilterChange = (value: string) => {
        setActiveGenre(value);
        updateSearchParams('filter', value);
    };

    return (
        <section className="max-w-5xl">
            <Outlet />

            <div className='flex flex-row justify-between'>
                <GenreSelect genre={genres} selectedGenre={activeGenre} onSelect={handleFilterChange} />
                <SortControl currentSelection={sortCriterion} onSelectionChange={handleSortChange} />
            </div>

            <div className="flex flex-wrap gap-4 justify-center bg-gray">
                {movieList.data.map((movie: Movie) => {
                    return (
                        <MovieTile key={movie.title} movie={movie} />
                    );
                })
                }
            </div>
        </section>
    )
}

export default MovieListPage;