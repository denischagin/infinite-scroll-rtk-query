import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {commentsApi} from "./api";
import {commentsPaginationSlice} from "./slices";

const rootReducer = combineReducers({
    [commentsApi.reducerPath]: commentsApi.reducer,
    commentsPagination: commentsPaginationSlice.reducer
})

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
        commentsApi.middleware
    ])
})