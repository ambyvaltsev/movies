import { MOVIE_API_KEY } from "../../helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  IReleasesQuery,
  IDigitalReleasesResponse,
  IMovie,
  IPremiere,
  IDigitalRelease,
  ITopMoviesResponse,
  IMoviesByKeyResponse,
  IAllMoviesQuery,
  IMoviesResponse,
  IVideo,
  IRelease,
  IAllMovies,
  IMovieShortInfo,
  IAllMoviesResponse,
} from "./types";
import { RootState } from "..";
import { IRatedMovie } from "../user/types";

type IRMovie = IMovie & IRatedMovie

export const fetchRatedMovies = createAsyncThunk<IRMovie[], number, { state: RootState }>(
  "@@movies/fetchRatedMovies",
  async (length = 5, { getState }) => {
    const ratedMovies = getState().user.ratedMovies;

    const fetches = ratedMovies.map((movie, index) => {
      if (index < length) {
        return axios({
          url: `https://kinopoiskapiunofficial.tech/api/v2.2/films/${movie.movieId}`,
          headers: {
            "X-API-KEY": `${MOVIE_API_KEY}`,
            "Content-Type": "application/json",
          },
        });
      }
    });

    const response = await Promise.all(fetches);

    return response.map((res, index) => ({...res?.data, ...ratedMovies[index]}));
  }
);

export const moviesAPI = createApi({
  reducerPath: "moviesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://kinopoiskapiunofficial.tech/api" }),
  endpoints: (build) => ({
    getMovie: build.query<IMovie, string | number>({
      query: (id) => ({
        url: `/v2.2/films/${id}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: IMovie) => {
        response.genres = response.genres.map((g) => Object.values(g).join(""));
        response.countries = response.countries.map((c) => Object.values(c).join(""));
        return response;
      },
    }),
    getVideo: build.query<IMoviesResponse<IVideo>, number>({
      query: (id) => ({
        url: `/v2.2/films/${id}/videos`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getPremiere: build.query<IMoviesResponse<IRelease>, IReleasesQuery>({
      query: ({ year, month }) => ({
        url: "/v2.2/films/premieres",
        params: {
          year,
          month,
        },
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: IMoviesResponse<IPremiere>) => {
        const premiere = response.items.reduce((acc: any, cur: IPremiere) => {
          return [
            ...acc,
            {
              id: cur.kinopoiskId,
              nameRu: cur.nameRu,
              nameEn: cur.nameEn,
              date: cur.premiereRu,
              poster: cur.posterUrlPreview,
            },
          ];
        }, []);
        return { total: response.total, items: premiere, pages: 1 };
      },
    }),
    getDigitalReleases: build.query<IMoviesResponse<IRelease>, IReleasesQuery>({
      query: ({ year, month, page }) => ({
        url: "/v2.1/films/releases",
        params: {
          year,
          month,
          page,
        },
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: IDigitalReleasesResponse) => {
        const digital = response.releases.reduce((acc: any, cur: IDigitalRelease) => {
          return [
            ...acc,
            {
              id: cur.filmId,
              nameRu: cur.nameRu,
              nameEn: cur.nameEn,
              date: cur.releaseDate,
              poster: cur.posterUrlPreview,
              rating: cur.rating,
              ratingVoteCount: cur.ratingVoteCount,
            },
          ];
        }, []);
        return {
          total: response.total,
          items: digital,
          pages: Math.ceil(response.total / 10),
        };
      },
    }),
    getTopMovies: build.query<IMoviesResponse<IMovieShortInfo>, { type: string; page: number }>({
      query: ({ type, page }) => ({
        url: `/v2.2/films/top?type=${type}&page=${page}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
      transformResponse: (response: ITopMoviesResponse) => {
        return {
          items: response.films,
          pages: response.pagesCount,
          page: 1,
        };
      },
    }),
    getMovieByKey: build.query<IMoviesByKeyResponse, { key: string; page: number }>({
      query: ({ key, page }) => ({
        url: `/v2.1/films/search-by-keyword?keyword=${key}&page=${page}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getAllMovies: build.query<IMoviesResponse<IAllMovies>, IAllMoviesQuery>({
      query: ({ countries, genres, order, type, yearFrom, yearTo, page }) => ({
        url: "/v2.2/films",
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
        params: {
          countries,
          genres,
          order,
          type,
          yearFrom,
          yearTo,
          page,
        },
      }),
      transformResponse: (response: IAllMoviesResponse<IAllMovies>) => {
        return {
          items: response.items,
          total: response.total,
          pages: response.totalPages,
          page: 1,
        };
      },
    }),
    getMoviesFilters: build.query<any, void>({
      query: () => ({
        url: "/v2.2/films/filters",
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useLazyGetMovieQuery,
  useGetAllMoviesQuery,
  useGetMovieByKeyQuery,
  useGetTopMoviesQuery,
  useGetMovieQuery,
  useGetPremiereQuery,
  useGetDigitalReleasesQuery,
  useGetMoviesFiltersQuery,
  useGetVideoQuery,
} = moviesAPI;
