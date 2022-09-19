export interface IRatedMovie {
  movieId: string | number;
  date: string;
  rating: string | number;
}
export interface IPickedMovie {
  movieId: string | number;
  date: string;
}

export interface IUserResponse {
  id: string;
  isAuth: boolean;
  login: string;
  password: string;
  pickedMovies: IPickedMovie[];
  ratedMovies: IRatedMovie[];
  reg: string;
}
