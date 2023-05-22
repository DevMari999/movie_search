import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {Movie} from "../../types";

interface MovieListingState {
    movies: Movie[];
    currentPage: number;
    selectedMovie: any | null;
}

const initialState: MovieListingState = {
    movies: [],
    currentPage: 1,
    selectedMovie: null,
};

const movieListingSlice = createSlice({
    name: 'movieListing',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setSelectedMovie: (state, action: PayloadAction<Movie>) => {
            state.selectedMovie = action.payload;
        },
    },
});

export const { setMovies, setCurrentPage, setSelectedMovie } = movieListingSlice.actions;

export default movieListingSlice.reducer;
