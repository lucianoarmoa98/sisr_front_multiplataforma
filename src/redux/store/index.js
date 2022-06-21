import { configureStore } from "@reduxjs/toolkit";
import  rootReducer  from "../../redux/reducers/reducer";

export const store = configureStore({
    reducer: rootReducer,
});