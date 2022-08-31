import best250 from "../assets/img/best250.png";
import popular100 from "../assets/img/popular100.png";
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

export const categoryMovies = [
  {
    title: "Top best 250 movies",
    key: "TOP_250_BEST_FILMS",
    posterUrl: best250,
    total: 250,
  },
  {
    title: "Top 100 popular movies",
    key: "TOP_100_POPULAR_FILMS",
    posterUrl: popular100,
    total: 100,
  },
];
