import { configureStore } from "@reduxjs/toolkit";
import { authSlice  } from "./auth";
import { moviesAPI, moviesSlice } from "./movies";

export const store = configureStore({
  reducer: {
    [moviesAPI.reducerPath]: moviesAPI.reducer,
    movies: moviesSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(moviesAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
