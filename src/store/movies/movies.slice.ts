import { createSlice } from "@reduxjs/toolkit";

interface IUserMovie {
  movieId: number | string;
  date: string;
  rating: string | number
}
interface IMoviesState {
  selectedMovies: IUserMovie[];
  ratedMovies: IUserMovie[];
}

const initialState: IMoviesState = {
  selectedMovies: [],
  ratedMovies: [],
};

export const moviesSlice = createSlice({
  name: "@@movies",
  initialState,
  reducers: {
    rateMovie: (state, action) => {
      state.ratedMovies.push(action.payload);
    },
  },
});

export const { rateMovie } = moviesSlice.actions;
