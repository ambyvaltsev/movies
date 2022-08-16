import { MOVIE_API_KEY } from "../helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IRelease,
  IReleasesResponse,
  IReleasesQuery,
  IDigitalReleasesResponse,
  IDigitalRelease,
} from "../models";

export const moviesAPI = createApi({
  reducerPath: "moviesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://kinopoiskapiunofficial.tech/api" }),
  endpoints: (build) => ({
    getMovie: build.query<any, number>({
      query: (number) => ({
        url: `/v2.2/films/${number}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getReleases: build.query<IRelease[], IReleasesQuery>({
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
      transformResponse: (response: IReleasesResponse) =>
        response.items.filter((movie) => new Date(movie.premiereRu) > new Date()),
    }),
    getDigitalReleases: build.query<IDigitalRelease[], IReleasesQuery>({
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
      transformResponse: (response: IDigitalReleasesResponse) => response.releases,
    }),
  }),
});

export const { useGetMovieQuery, useGetReleasesQuery, useGetDigitalReleasesQuery } = moviesAPI;
