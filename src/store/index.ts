import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./auth/auth.slice";
import { moviesAPI } from "./movies";
import { userAPI, userSlice } from "./user/";

export const store = configureStore({
  reducer: {
    [moviesAPI.reducerPath]: moviesAPI.reducer,
    [userAPI.reducerPath]: userAPI.reducer,
    user: userSlice.reducer,
    auth: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(moviesAPI.middleware, userAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
