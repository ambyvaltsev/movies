
export interface IDigitalReleasesResponse {
  total: number;
  releases: IDigitalRelease[];
}
export interface IMoviesResponse<T> {
  totalPages?: number;
  pages?: number
  total: number
  items: T[]
}
export interface IPremiere {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  duration: number;
  premiereRu: string;
}
export interface IReleasesQuery {
  year: number;
  month: string;
  page?: number;
}
export interface IDigitalRelease {
  filmId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  rating: number;
  ratingVoteCount: number;
  expectationsRating: number;
  expectationsRatingVoteCount: number;
  duration: number;
  releaseDate: string;
}
export interface IRelease {
  id: string;
  nameRu: string;
  nameEn: string;
  date: string;
  poster: string;
  rating?: number;
  ratingVoteCount?: number;
}
export interface IMovie {
  kinopoiskId: number;
  imdbId: string;
  nameRu: string;
  nameEn?: any;
  nameOriginal: string;
  posterUrl: string;
  posterUrlPreview: string;
  coverUrl?: any;
  logoUrl?: any;
  reviewsCount: number;
  ratingGoodReview?: any;
  ratingGoodReviewVoteCount: number;
  ratingKinopoisk?: any;
  ratingKinopoiskVoteCount: number;
  ratingImdb?: any;
  ratingImdbVoteCount: number;
  ratingFilmCritics?: any;
  ratingFilmCriticsVoteCount: number;
  ratingAwait: number;
  ratingAwaitCount: number;
  ratingRfCritics?: any;
  ratingRfCriticsVoteCount: number;
  webUrl: string;
  year: number;
  filmLength: number;
  slogan?: any;
  description: string;
  shortDescription?: any;
  editorAnnotation?: any;
  isTicketsAvailable: boolean;
  productionStatus?: any;
  type: string;
  ratingMpaa: string;
  ratingAgeLimits: string;
  countries: string[];
  genres: string[];
  startYear?: any;
  endYear?: any;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
  hasImax: boolean;
  has3D: boolean;
  lastSync: Date;
}
export interface IStaffResponse {
  staffId: number;
  nameRu: string;
  nameEn: string;
  description: string;
  posterUrl: string;
  professionText: string;
  professionKey: string;
}
export interface ISingleUnit {
  id: number;
  nameRu: string;
  nameEn: string;
}
export interface IStaff {
  director: ISingleUnit[];
  writer: ISingleUnit[];
  producer: ISingleUnit[];
  composer: ISingleUnit[];
  editor: ISingleUnit[];
  design: ISingleUnit[];
  actors: ISingleUnit[];
}
export interface IVideo {
  url: string;
  name: string;
  site: string;
}
export interface ISpecificStuff {
  personId: number;
  webUrl: string;
  nameRu: string;
  nameEn: string;
  sex: string;
  posterUrl: string;
  growth: string;
  birthday: string;
  death: string;
  age: number;
  birthplace: string;
  deathplace: string;
  hasAwards: number;
  profession: string;
  facts: string[];
  spouses: any[];
  films: IStaffFilm[];
}
interface IStaffFilm {
  description: string;
  filmId: number;
  general: boolean;
  nameEn: string;
  nameRu: string;
  professionKey: string;
  rating: string;
}
export interface ITopMoviesResponse {
  pagesCount: number;
  films: IMovieShortInfo[];
}
export interface IMoviesByKeyResponse {
  films: IMovieShortInfo[];
  keyword: string;
  pagesCount: number;
  searchFilmsCountResult: number;
}
export interface IMovieShortInfo {
  countries: { country: string }[];
  description?: string;
  filmId: number;
  filmLength: string;
  genres: { genre: string }[];
  nameEn: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  rating: string;
  ratingVoteCount: number;
  type?: string;
  year: string;
}
export interface IPersonsShortInfo {
  kinopoiskId: number;
  nameEn: string;
  nameRu: string;
  posterUrl: string;
  sex: string;
  webUrl: string;
}
export interface IAllMoviesQuery {
  countries?: string | number;
  genres?: string | number;
  order?: string | number;
  type?: string;
  yearFrom?: number;
  yearTo?: number;
  page: number;
}
export interface IAllMovies {
  countries: { country: string }[];
  genres: { genre: string }[];
  imdbId: string;
  kinopoiskId: number;
  nameEn: string;
  nameOriginal: string;
  nameRu: string;
  posterUrl: string;
  posterUrlPreview: string;
  ratingImdb: number;
  ratingKinopoisk: number;
  type: string;
  year: number;
}
