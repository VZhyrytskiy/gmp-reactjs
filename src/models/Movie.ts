export interface Movie {
    poster_path: string;
    title: string;
    release_date: string;
    genres: string[];
    vote_average: number;
    overview: string;
    runtime: number;  // minutes
}