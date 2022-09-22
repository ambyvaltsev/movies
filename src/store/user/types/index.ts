export interface IRatedMovie {
  movieId: string | number;
  date: string;
  rating: string | number;
}
export interface IFavoriteMovie {
  movieId: string | number;
  date: string;
}

export interface IUserResponse {
  id: string;
  isAuth: boolean;
  login: string;
  password: string;
  favoriteMovies: IFavoriteMovie[];
  ratedMovies: IRatedMovie[];
  reg: string;
}
