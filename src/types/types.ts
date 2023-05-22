export interface Movie {
    id: number;
    title: string;
    release_date: string;
    overview: string;
    // Add more properties as needed
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