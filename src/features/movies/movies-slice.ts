import { createSlice } from "@reduxjs/toolkit";
import { moviesAPI } from "../../queries/movies.api";



interface IMovie {
  description: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  nameOriginal: string;
}

interface IState {
  movie: IMovie;
}

const initialState: IState = {
  movie: { description: "", countries: [], genres: [], nameOriginal: "" },
};

export const moviesSlice = createSlice({
  name: "@@movies",
  initialState,
  reducers: {
 
  },
  extraReducers: (builder) => {
    builder.addMatcher(moviesAPI.endpoints.getMovie.matchFulfilled, (state, action) => {
      state.movie = action.payload
    })
  }
});
