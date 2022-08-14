import { MOVIE_API_KEY } from '../helpers';
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const moviesAPI = createApi({
  reducerPath: "moviesAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://kinopoiskapiunofficial.tech/api/v2.2/" }),
  endpoints: (build) => ({
    getMovie: build.query({
      query: (number) => ({
        url: `films/${number}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const { useGetMovieQuery } = moviesAPI;
