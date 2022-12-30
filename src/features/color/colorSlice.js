import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mainColor: '#d4d6d6',
    sortedColor: 'green',
    comparingColor: 'black',
    highlightingColor: 'orange',
    bucketColor: '#daf1f7',
}

const colorSlice = createSlice({
    name: 'color',
    initialState,
    reducers: {

    }
})

export const {setColor} = colorSlice.actions;

export default colorSlice.reducer;
