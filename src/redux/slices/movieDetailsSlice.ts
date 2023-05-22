import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {api} from '../../services';
import { Movie } from '../../types';

interface MovieDetailsState {
    details: Movie | null;
    loading: boolean;
    error: string | null;
}

const initialState: MovieDetailsState = {
    details: null,
    loading: false,
    error: null,
};

export const fetchMovieDetails = createAsyncThunk(
    'movieDetails/fetchMovieDetails',
    async (movieId: string) => {
        try {
            const response = await api.get(`/movie/${movieId}`);
            const movieData: Movie = response.data;
            return movieData;
        } catch (error) {
            throw new Error('Failed to fetch movie details.');
        }
    }
);

const movieDetailsSlice = createSlice({
    name: 'movieDetails',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMovieDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMovieDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.details = action.payload;
                state.error = null;
            })
            .addCase(fetchMovieDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch movie details.';
            });
    },
});

export default movieDetailsSlice.reducer;