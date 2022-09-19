import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadFromStorage } from "../../helpers";
import { IPickedMovie, IRatedMovie } from "./types";
import { userAPI } from "./user.api";

interface IInitialState {
  ratedMovies: IRatedMovie[];
  pickedMovies: IPickedMovie[];
}

const initialState: IInitialState = {
  ratedMovies: loadFromStorage("ratedMovies") || [],
  pickedMovies: [],
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
      );
  },
});
