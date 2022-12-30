import { configureStore} from "@reduxjs/toolkit";
import dataReducer from '../features/data/dataSlice';
import sortReducer from '../features/sort/sortSlice';
import speedReducer from "../features/speed/speedSlice";
import colorReducer from "../features/color/colorSlice";

export const store = configureStore({
    reducer: {
        data: dataReducer,
        sort: sortReducer,
        speed: speedReducer,
        color: colorReducer,
    }
})
