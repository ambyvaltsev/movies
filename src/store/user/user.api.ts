import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUserResponse, IRatedMovie } from "./types";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://62aa4db13b3143855445970a.mockapi.io/" }),
  endpoints: (builder) => ({
    addRatedMovie: builder.mutation<IRatedMovie[], { id: number; movieId: string, movies: IRatedMovie[] }>({
      query: ({ id, movies }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: { ratedMovies: [...movies] },
      }),
      transformResponse: (response: IUserResponse, _, arg) => {
        return response.ratedMovies;
      },
    }),
    getRatedMovies: builder.query<IRatedMovie[], string | number>({
      query: (id) => ({
        url: `users/${id}`,
      }),
      transformResponse: (response: IUserResponse) => {
        return response.ratedMovies;
      },
    }),
    deleteRatedMovie: builder.mutation<IRatedMovie[], { id: number; movies: IRatedMovie[] }>({
      query: ({ id, movies }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: { ratedMovies: [...movies] },
      }),
      transformResponse: (response: IUserResponse) => {
        return response.ratedMovies;
      }, 
    })
  }),
});

export const { useAddRatedMovieMutation, useLazyGetRatedMoviesQuery, useDeleteRatedMovieMutation } = userAPI;
