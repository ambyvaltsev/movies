import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage } from "../../helpers";
import { IFavoriteMovie, IRatedMovie } from "./types";
import { userAPI } from "./user.api";

interface IInitialState {
  ratedMovies: IRatedMovie[];
  favoriteMovies: IFavoriteMovie[];
}

const initialState: IInitialState = {
  ratedMovies: loadFromStorage("ratedMovies") || [],
  favoriteMovies: loadFromStorage("favoriteMovies") || [],
};

export const userSlice = createSlice({
  name: "@@user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(
        userAPI.endpoints.addRatedMovie.matchFulfilled,
        (state, action: PayloadAction<IRatedMovie[]>) => {
          state.ratedMovies = action.payload;
        }
      )
      .addMatcher(
        userAPI.endpoints.getRatedMovies.matchFulfilled,
        (state, action: PayloadAction<IRatedMovie[]>) => {
          state.ratedMovies = action.payload;
        }
      )
      .addMatcher(
        userAPI.endpoints.deleteRatedMovie.matchFulfilled,
        (state, action: PayloadAction<IRatedMovie[]>) => {
          state.ratedMovies = action.payload;
        }
      )
      .addMatcher(
        userAPI.endpoints.addToFavotites.matchFulfilled,
        (state, action: PayloadAction<IFavoriteMovie[]>) => {
          state.favoriteMovies = action.payload;
        }
      )
      .addMatcher(
        userAPI.endpoints.deleteFavotite.matchFulfilled,
        (state, action: PayloadAction<IFavoriteMovie[]>) => {
          state.favoriteMovies = action.payload;
        }
      )
      .addMatcher(
        userAPI.endpoints.getFavoriteMovies.matchFulfilled,
        (state, action: PayloadAction<IFavoriteMovie[]>) => {
          state.favoriteMovies = action.payload;
        }
      );
  },
});
