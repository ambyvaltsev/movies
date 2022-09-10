import { ISelected } from "./../pages/movies/components/moviesAll/MoviesAll";
import { countries, genres, order } from "./vars";

export const getParams = (search: string) => {
  let query = {} as ISelected;
  const params = new URLSearchParams(search);

  for (let param of params) {
    if (param[0] === "country") {
      query.country = { value: param[1], id: countries.find((item) => item.value === param[1])?.id };
    }
    if (param[0] === "genre") {
      query.genre = { value: param[1], id: genres.find((item) => item.value === param[1])?.id };
    }
    if (param[0] === "order") {
      query.order = { value: param[1], id: order.find((item) => item.value === param[1])?.id };
    }
  }

  return query;
};
export const getUrl = (selected: ISelected) => {
  let urlArr = Object.entries(selected);
  let url = urlArr.reduce((acc, cur) => {
    return [...acc, `${cur[0]}=${cur[1].value}`];
  }, [] as any);
  return url.filter((item: string) => item !== "");
};
