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
  description: string;
  countries: { country: string }[];
  genres: { genre: string }[];
  nameOriginal: string;
}
