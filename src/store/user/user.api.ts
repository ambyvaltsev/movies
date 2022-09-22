import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUserResponse, IRatedMovie, IFavoriteMovie } from "./types";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({ baseUrl: "https://62aa4db13b3143855445970a.mockapi.io/" }),
  endpoints: (builder) => ({
    addRatedMovie: builder.mutation<IRatedMovie[], { id: number; movieId: string; movies: IRatedMovie[] }>({
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
    }),
    addToFavotites: builder.mutation<IFavoriteMovie[], { id: number; movies: IFavoriteMovie[] }>({
      query: ({ id, movies }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: { favoriteMovies: [...movies] },
      }),
      transformResponse: (response: IUserResponse, _, arg) => {
        return response.favoriteMovies;
      },
    }),
    deleteFavotite: builder.mutation<IFavoriteMovie[], { id: number; movies: IFavoriteMovie[] }>({
      query: ({ id, movies }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: { favoriteMovies: [...movies] },
      }),
      transformResponse: (response: IUserResponse, _, arg) => {
        return response.favoriteMovies;
      },
    }),
    getFavoriteMovies: builder.query<IFavoriteMovie[], string | number>({
      query: (id) => ({
        url: `users/${id}`,
      }),
      transformResponse: (response: IUserResponse) => {
        return response.favoriteMovies;
      },
    }),
  }),
});

export const {
  useLazyGetFavoriteMoviesQuery,
  useDeleteFavotiteMutation,
  useAddRatedMovieMutation,
  useLazyGetRatedMoviesQuery,
  useDeleteRatedMovieMutation,
  useAddToFavotitesMutation,
} = userAPI;
