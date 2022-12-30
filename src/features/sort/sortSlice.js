import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    category: 'efficientSorts',
    sortComplete: false,
}

const sortSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setCategory: (state, { payload }) => {
            state.category = payload;
        },
        setSortComplete: (state, { payload }) => {
            state.sortComplete = payload;
        },
    }
})

export const {setCategory, setSortComplete} = sortSlice.actions;

export default sortSlice.reducer;
