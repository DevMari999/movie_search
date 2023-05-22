import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLightTheme: true,
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.isLightTheme = !state.isLightTheme;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
