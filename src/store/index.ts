import { configureStore } from "@reduxjs/toolkit";
import { moviesAPI } from "./movies/movies.api";
import { moviesSlice } from "./movies/movies.slice";


export const store = configureStore({
  reducer: {
    [moviesAPI.reducerPath]: moviesAPI.reducer,
    movies: moviesSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesAPI.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch