import { configureStore } from "@reduxjs/toolkit";
import { moviesAPI } from "../queries/movies.api";
import { moviesSlice } from "../features/movies/movies-slice";


export const store = configureStore({
  reducer: {
    [moviesAPI.reducerPath]: moviesAPI.reducer,
    movies: moviesSlice.reducer,
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesAPI.middleware)
})


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch