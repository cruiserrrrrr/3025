import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
    TypedUseSelectorHook,
    useDispatch as useReduxDispatch,
    useSelector as useReduxSelector,
} from "react-redux";
import jobsSlice from "./slices/jobs";

const rootReducer = combineReducers({
    jobsSlice,
});

export const makeStore = () => {
    return configureStore({
        reducer: rootReducer,
    });
};

export const store = makeStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];

type DispatchFunc = () => AppDispatch;
export const useDispatch: DispatchFunc = useReduxDispatch;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
