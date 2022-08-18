import { MOVIE_API_KEY } from "../../helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IReleasesResponse,
  IReleasesQuery,
  IDigitalReleasesResponse,
  IReleaseData,
  IMovie,
} from "../../models";

export const moviesAPI = createApi({
  reducerPath: "moviesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://kinopoiskapiunofficial.tech/api" }),
  endpoints: (build) => ({
    getMovie: build.query<IMovie, string>({
      query: (id) => ({
        url: `/v2.2/films/${id}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getReleases: build.query<IReleaseData[], IReleasesQuery>({
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
        response.items.reduce((acc: any, cur) => {
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
        }, []),
    }),
    getDigitalReleases: build.query<IReleaseData[], IReleasesQuery>({
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
      transformResponse: (response: IDigitalReleasesResponse) =>
        response.releases.reduce((acc: any, cur) => {
          return [
            ...acc,
            {
              id: cur.filmId,
              nameRu: cur.nameRu,
              nameEn: cur.nameEn,
              date: cur.releaseDate,
              poster: cur.posterUrlPreview,
            },
          ];
        }, []),
    }),
  }),
});

export const { useGetMovieQuery, useGetReleasesQuery, useLazyGetReleasesQuery, useGetDigitalReleasesQuery } =
  moviesAPI;
