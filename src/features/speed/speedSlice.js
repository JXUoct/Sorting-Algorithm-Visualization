import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    interval: 10
}

const speedSlice = createSlice({
    name: 'speed',
    initialState,
    reducers: {
        setSpeed: (state, { payload }) => {
            if (payload === 'fast') {
                state.interval = 10;
                } else if (payload === 'medium') {
                    state.interval = 100;
                } else state.interval = 200;
        },
    }
})

export const {setSpeed} = speedSlice.actions;

export default speedSlice.reducer;
