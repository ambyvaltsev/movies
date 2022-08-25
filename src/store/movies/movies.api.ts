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
  IStaffUnit,
  IVideResponse,
  ISpecificStuff,
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
        const staffObj = {} as IStaff;
        staffObj.director = response
          ?.filter((p) => p.professionKey === "DIRECTOR")
          .reduce((acc: IStaffUnit[], cur) => {
            return [...acc, { id: cur.staffId, nameEn: cur.nameEn, nameRu: cur.nameRu }];
          }, []);

        staffObj.writer = response
          .filter((p) => p.professionKey === "WRITER")
          .reduce((acc: IStaffUnit[], cur) => {
            return [...acc, { id: cur.staffId, nameEn: cur.nameEn, nameRu: cur.nameRu }];
          }, []);

        staffObj.producer = response
          .filter((p) => p.professionKey === "PRODUCER")
          .reduce((acc: IStaffUnit[], cur) => {
            return [...acc, { id: cur.staffId, nameEn: cur.nameEn, nameRu: cur.nameRu }];
          }, []);

        staffObj.composer = response
          .filter((p) => p.professionKey === "COMPOSER")
          .reduce((acc: IStaffUnit[], cur) => {
            return [...acc, { id: cur.staffId, nameEn: cur.nameEn, nameRu: cur.nameRu }];
          }, []);

        staffObj.design = response
          .filter((p) => p.professionKey === "DESIGN")
          .reduce((acc: IStaffUnit[], cur) => {
            return [...acc, { id: cur.staffId, nameEn: cur.nameEn, nameRu: cur.nameRu }];
          }, []);

        staffObj.editor = response
          .filter((p) => p.professionKey === "EDITOR")
          .reduce((acc: IStaffUnit[], cur) => {
            return [...acc, { id: cur.staffId, nameEn: cur.nameEn, nameRu: cur.nameRu }];
          }, []);

        staffObj.actors = response
          .filter((p) => p.professionKey === "ACTOR")
          .reduce((acc: IStaffUnit[], cur) => {
            return [...acc, { id: cur.staffId, nameEn: cur.nameEn, nameRu: cur.nameRu }];
          }, []);
        return staffObj;
      },
    }),
    getSpecificStaff: build.query<ISpecificStuff, string>({
      query: (id) => ({
        url: `/v1/staff/${id}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      })
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
  }),
});

export const {
  useGetMovieQuery,
  useGetPremiereQuery,
  useGetDigitalReleasesQuery,
  useGetStaffQuery,
  useGetVideoQuery,
  useGetSpecificStaffQuery
} = moviesAPI;
