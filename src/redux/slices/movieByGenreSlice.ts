import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from "../../services/api";
import { Movie } from "../../types";


export interface MoviesState {
    data: Movie[];
    currentPage: number;
    totalPages: number;
    length: number;
}

export interface FetchMoviesByGenrePayload {
    genreId: number;
    page: number;
}

export const fetchMoviesByGenre = createAsyncThunk(
    'movies/fetchMoviesByGenre',
    async ({ genreId, page }: FetchMoviesByGenrePayload) => {
        const response = await api.get(`/discover/movie`, {
            params: {
                with_genres: genreId,
                page,
            },
        });

        return response.data;
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState: {
        data: [],
        currentPage: 0,
        totalPages: 0,
        length: 0,
    } as MoviesState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
            state.data = action.payload.results;
            state.currentPage = action.payload.page;
            state.totalPages = action.payload.total_pages;
            state.length = action.payload.total_results;
        });
    },
});

export default moviesSlice.reducer;
