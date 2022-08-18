export interface IReleasesResponse {
  items: IRelease[];
  total: number;
}
export interface Country {
  country: string;
}

export interface Genre {
  genre: string;
}
export interface IRelease {
  kinopoiskId: number;
  nameRu: string;
  nameEn: string;
  year: number;
  posterUrl: string;
  posterUrlPreview: string;
  countries: Country[];
  genres: Genre[];
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
  countries: Country[];
  genres: Genre[];
  rating: number;
  ratingVoteCount: number;
  expectationsRating: number;
  expectationsRatingVoteCount: number;
  duration: number;
  releaseDate: string;
}

export interface IDigitalReleasesResponse {
  page: number;
  total: number;
  releases: IDigitalRelease[];
}
export interface IReleaseData {
  id: string;
  nameRu: string;
  nameEn: string;
  date: string;
  poster: string;
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
  countries: Country[];
  genres: Genre[];
  startYear?: any;
  endYear?: any;
  serial: boolean;
  shortFilm: boolean;
  completed: boolean;
  hasImax: boolean;
  has3D: boolean;
  lastSync: Date;
}
