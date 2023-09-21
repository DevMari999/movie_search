import {configureStore} from '@reduxjs/toolkit';
import homeReducer from "../redux/slices/homeSlice"
import movieListingReducer from "./slices/movieListingSlice";
import headerReducer from './slices/headerSlice';
import movieDetailsReducer from './slices/movieDetailsSlice';
import moviesReducer from './slices/movieByGenreSlice';
import themeReduser from './slices/themeSlice';


const store = configureStore({
    reducer: {
        home: homeReducer,
        movieListing: movieListingReducer,
        header: headerReducer,
        movieDetails: movieDetailsReducer,
        movies: moviesReducer,
        theme: themeReduser,

    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
