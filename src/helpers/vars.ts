import best250 from "../assets/img/best250.png";
import popular100 from "../assets/img/popular100.png";
import comedy from "../assets/img/comedy.png";
import fantasy from "../assets/img/fantasy.png";
import action from "../assets/img/action.png";
import russia from "../assets/img/russia.png";
import usa from "../assets/img/usa.png";
import france from "../assets/img/france.png";

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const years = [
  new Date().getFullYear() + 1,
  new Date().getFullYear(),
  new Date().getFullYear() - 1,
  new Date().getFullYear() - 2,
  new Date().getFullYear() - 3,
  new Date().getFullYear() - 4,
  new Date().getFullYear() - 5,
];

interface IAllCategories {
  [index: string]: ICategoryItem[];
}
export interface ICategoryItem {
  title: string;
  key?: string;
  posterUrl: any;
  total?: number;
  id?: string;
  description?: string;
}

export const allCategories: IAllCategories = {
  movies: [
    {
      title: "Top best 250 movies",
      key: "TOP_250_BEST_FILMS",
      posterUrl: best250,
      total: 250,
      id: "best250",
      description:
        "The rating is based on the results of voting by site visitors. Anyone can take part in it by voting for their favorite film.",
    },
    {
      title: "Top 100 popular movies",
      key: "TOP_100_POPULAR_FILMS",
      posterUrl: popular100,
      total: 100,
      id: "popular100",
    },
  ],
  genres: [
    {
      title: "Comedy",
      key: "TOP_250_BEST_FILMS",
      posterUrl: comedy,
    },
    {
      title: "Fantasy",
      key: "TOP_250_BEST_FILMS",
      posterUrl: fantasy,
    },
    {
      title: "Action",
      key: "TOP_250_BEST_FILMS",
      posterUrl: action,
    },
  ],
  countries: [
    {
      title: "Russia",
      key: "TOP_250_BEST_FILMS",
      posterUrl: russia,
    },
    {
      title: "USA",
      key: "TOP_250_BEST_FILMS",
      posterUrl: usa,
    },
    {
      title: "France",
      key: "TOP_250_BEST_FILMS",
      posterUrl: france,
    },
  ],
};
