import { createSlice } from "@reduxjs/toolkit";
import { moviesAPI } from "./movies.api";
import {IMovie } from "../../models";

export interface IMoviesState {
  movie: IMovie;
}

const initialState: IMoviesState = {
  movie: { description: "", countries: [], genres: [], nameOriginal: "" },
};

export const moviesSlice = createSlice({
  name: "@@movies",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addMatcher(moviesAPI.endpoints.getMovie.matchFulfilled, (state, action) => {
        state.movie = action.payload;
      })
 
  },
});
