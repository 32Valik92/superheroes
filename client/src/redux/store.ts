import {combineReducers, configureStore} from "@reduxjs/toolkit";

import {heroesReducer} from "./slice";

let rootReducer = combineReducers({
    heroesReducer
});

const setupStore = () => configureStore({
    reducer: rootReducer
})

// Types for custom useSelector and useDispatch
type RootState = ReturnType<typeof rootReducer>
type AppStore = ReturnType<typeof setupStore>
type AppDispatch = AppStore['dispatch']

export type {
    RootState,
    AppStore,
    AppDispatch
}

export {
    setupStore
}