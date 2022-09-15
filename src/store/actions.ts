import { loginUser, logoutUser } from "./auth/auth.slice";
import { moviesSlice } from "./movies/movies.slice";

export const allActions = {
  loginUser,
  logoutUser,
  ...moviesSlice.actions,
};
