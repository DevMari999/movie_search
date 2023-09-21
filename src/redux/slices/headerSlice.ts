import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface HeaderState {
    isVisible: boolean;
}

const initialState: HeaderState = {
    isVisible: true,
};

const headerSlice = createSlice({
    name: 'header',
    initialState,
    reducers: {
        setHeaderVisibility: (state, action: PayloadAction<boolean>) => {
            state.isVisible = action.payload;
        },
    },
});

export const {setHeaderVisibility} = headerSlice.actions;
export default headerSlice.reducer;
