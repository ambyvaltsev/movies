import { MOVIE_API_KEY } from "../../helpers";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  IReleasesQuery,
  IDigitalReleasesResponse,
  IMovie,
  IReleases,
  IPremiere,
  IPremiereResponse,
  IDigitalRelease,
  IStaffResponse,
  IStaff,
  ISingleUnit,
  IVideResponse,
  ISpecificStuff,
  ITopAwaitResponse,
  IMoviesByKeyResponse,
  IPersonceByKeyResponse,
} from "../../models";

function formatStaff(staff: IStaffResponse[], key: string): ISingleUnit[] {
  return staff
    .filter((p) => p.professionKey === key)
    .reduce((acc: ISingleUnit[], cur) => {
      return [...acc, { id: cur.staffId, nameEn: cur.nameEn, nameRu: cur.nameRu }];
    }, []);
}

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
      transformResponse: (response: IMovie) => {
        response.genres = response.genres.map((g) => Object.values(g).join(""));
        response.countries = response.countries.map((c) => Object.values(c).join(""));
        return response;
      },
    }),
    getStaff: build.query<IStaff, string>({
      query: (id) => ({
        url: "/v1/staff",
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
        params: {
          filmId: id,
        },
      }),
      transformResponse: (response: IStaffResponse[]) => {
        return {
          director: formatStaff(response, "DIRECTOR"),
          writer: formatStaff(response, "WRITER"),
          producer: formatStaff(response, "PRODUCER"),
          composer: formatStaff(response, "COMPOSER"),
          design: formatStaff(response, "DESIGN"),
          editor: formatStaff(response, "EDITOR"),
          actors: formatStaff(response, "ACTOR"),
        };
      },
    }),
    getSpecificStaff: build.query<ISpecificStuff, string>({
      query: (id) => ({
        url: `/v1/staff/${id}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getVideo: build.query<IVideResponse, number>({
      query: (id) => ({
        url: `/v2.2/films/${id}/videos`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getPremiere: build.query<IReleases, IReleasesQuery>({
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
      transformResponse: (response: IPremiereResponse) => {
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
        return { total: response.total, releases: premiere, pages: 1 };
      },
    }),
    getDigitalReleases: build.query<IReleases, IReleasesQuery>({
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
            },
          ];
        }, []);
        return {
          total: response.total,
          releases: digital,
          pages: Math.ceil(response.total / 10),
        };
      },
    }),
    getTopMovies: build.query<ITopAwaitResponse, { type: string; page: number }>({
      query: ({ type, page }) => ({
        url: `/v2.2/films/top?type=${type}&page=${page}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
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
    getPersonByKey: build.query<IPersonceByKeyResponse, { key: string; page: number }>({
      query: ({ key, page }) => ({
        url: `/v1/persons?name=${key}&page=${page}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
  }),
});

export const {
  useGetPersonByKeyQuery,
  useGetMovieByKeyQuery,
  useGetTopMoviesQuery,
  useGetMovieQuery,
  useGetPremiereQuery,
  useLazyGetPremiereQuery,
  useGetDigitalReleasesQuery,
  useLazyGetDigitalReleasesQuery,
  useGetStaffQuery,
  useGetVideoQuery,
  useGetSpecificStaffQuery,
} = moviesAPI;
