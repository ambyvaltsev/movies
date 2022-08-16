import { createSlice } from "@reduxjs/toolkit";
import { moviesAPI } from "../../queries/movies.api";
import { IDigitalRelease, IMovie, IRelease } from "../../models";

export interface IState {
  movie: IMovie;
  releases: IRelease[];
  digitalReleases: IDigitalRelease[];
}

const initialState: IState = {
  movie: { description: "", countries: [], genres: [], nameOriginal: "" },
  releases: [],
  digitalReleases: [],
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
      .addMatcher(moviesAPI.endpoints.getReleases.matchFulfilled, (state, action) => {
        state.releases = action.payload;
      })
      .addMatcher(moviesAPI.endpoints.getDigitalReleases.matchFulfilled, (state, action) => {
        state.digitalReleases = action.payload;
      });
  },
});
