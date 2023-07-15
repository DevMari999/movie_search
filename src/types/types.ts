export interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    poster_path: string;
    genres: { id: number; name: string }[];
    original_language: string;
    popularity: number;
    vote_average: number;
}
export interface Genre {
    id: number;
    name: string;
}

// export interface HomeState {
//     searchResults: Movie[];
//
// }
