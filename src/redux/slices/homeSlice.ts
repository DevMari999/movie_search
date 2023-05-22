import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface HomeState {
    searchQuery: string;
    searchResults: any[];
}

const initialState: HomeState = {
    searchQuery: '',
    searchResults: [],
};

const homeSlice = createSlice({
    name: 'home',
    initialState,
    reducers: {
        setSearchQuery: (state, action: PayloadAction<string>) => {
            state.searchQuery = action.payload;
        },
        setSearchResults: (state, action: PayloadAction<any[]>) => {
            state.searchResults = action.payload;
        },
    },
});

export const { setSearchQuery, setSearchResults } = homeSlice.actions;

export default homeSlice.reducer;