import best250 from "../assets/img/best250.png";
import popular100 from "../assets/img/popular100.png";
import comedy from "../assets/img/comedy.png";
import fantasy from "../assets/img/fantasy.png";
import action from "../assets/img/action.png";
import russia from "../assets/img/russia.png";
import usa from "../assets/img/usa.png";
import france from "../assets/img/france.png";

export const months = [
  { value: "January" },
  { value: "February" },
  { value: "March" },
  { value: "April" },
  { value: "May" },
  { value: "June" },
  { value: "July" },
  { value: "August" },
  { value: "September" },
  { value: "October" },
  { value: "November" },
  { value: "December" },
];

export const years = [
  { value: new Date().getFullYear() + 1 },
  { value: new Date().getFullYear() },
  { value: new Date().getFullYear() - 1 },
  { value: new Date().getFullYear() - 2 },
  { value: new Date().getFullYear() - 3 },
  { value: new Date().getFullYear() - 4 },
  { value: new Date().getFullYear() - 5 },
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

export const genres = [
  { id: "", value: "All genres" },
  { id: 1, value: "Триллер" },
  { id: 2, value: "Драма" },
  { id: 3, value: "Криминал" },
  { id: 4, value: "Мелодрама" },
  { id: 5, value: "Детектив" },
  { id: 6, value: "Фантастика" },
  { id: 7, value: "Приключения" },
  { id: 8, value: "Биография" },
  { id: 10, value: "Вестерн" },
  { id: 11, value: "Боевик" },
  { id: 12, value: "Фэнтези" },
  { id: 13, value: "Комедия" },
  { id: 14, value: "Военный" },
  { id: 15, value: "История" },
  { id: 17, value: "Ужасы" },
  { id: 18, value: "Мультфильм" },
  { id: 22, value: "Документальный" },
  { id: 24, value: "Аниме" },
];
export const countries = [
  { id: "", value: "All countries" },
  { id: 1, value: "США" },
  { id: 3, value: "Франция" },
  { id: 4, value: "Польша" },
  { id: 5, value: "Великобритания" },
  { id: 6, value: "Швеция" },
  { id: 7, value: "Индия" },
  { id: 8, value: "Испания" },
  { id: 9, value: "Германия" },
  { id: 10, value: "Италия" },
  { id: 13, value: "Австралия" },
  { id: 15, value: "Мексика" },
  { id: 16, value: "Япония" },
  { id: 21, value: "Китай" },
  { id: 22, value: "Норвегия" },
  { id: 33, value: "СССР" },
  { id: 34, value: "Россия" },
  { id: 106, value: "Украина" },
  { id: 128, value: "Беларусь" },
];
