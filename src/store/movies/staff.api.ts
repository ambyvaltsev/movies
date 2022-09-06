import { MOVIE_API_KEY } from "../../helpers";
import { moviesAPI } from "./movies.api";
import {
  IStaffResponse,
  IStaff,
  ISpecificStuff,
  ISingleUnit,
  IMoviesResponse,
  IPersonsShortInfo,
} from "../../models";

function formatStaff(staff: IStaffResponse[], key: string): ISingleUnit[] {
  return staff
    .filter((p) => p.professionKey === key)
    .reduce((acc: ISingleUnit[], cur) => {
      return [...acc, { id: cur.staffId, nameEn: cur.nameEn, nameRu: cur.nameRu }];
    }, []);
}

const staffAPI = moviesAPI.injectEndpoints({
  endpoints: (builder) => ({
    getStaff: builder.query<IStaff, string>({
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
    getSpecificStaff: builder.query<ISpecificStuff, string>({
      query: (id) => ({
        url: `/v1/staff/${id}`,
        headers: {
          "X-API-KEY": `${MOVIE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }),
    }),
    getPersonByKey: builder.query<IMoviesResponse<IPersonsShortInfo>, { key: string; page: number }>({
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

export const { useGetStaffQuery, useGetSpecificStaffQuery, useGetPersonByKeyQuery } = staffAPI;
