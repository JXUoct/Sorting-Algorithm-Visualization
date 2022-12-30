import { createSlice } from "@reduxjs/toolkit";

const initialValues = [
    280, 381, 207, 423,  61, 377,
    214, 327, 216, 354, 189, 402,
    125, 339,  91, 408, 170, 373,
    395, 116, 184,  18, 243, 471,
    432
  ];

const initialState = {
    size: 25,
    range: 500,
    values: initialValues,
}

const dataSlice = createSlice({
    name: 'data',
    initialState,
    reducers: {
        generateData: (state) => {
            const getRandInt = (min, max) => {
                return Math.floor(Math.random() * (max - min) + min);
            };

            let arr = [];
            const min = 0;
            const max = state.range;
            for (let i = 0; i < state.size; i++) {
                arr.push(getRandInt(min, max));
            };
            state.values = arr;
            state.unSortedValues = state.values;
        },
        setSortedValues: (state, {payload}) => {
            state.sortedValues = payload;
        },
        setDataSize: (state, {payload}) => {
            state.size = payload;
        },
        setDataRange: (state, {payload}) => {
            state.range = payload;
        },
    }
})

export const {generateData, setSortedValues, setDataSize, setDataRange} = dataSlice.actions;
export default dataSlice.reducer;
