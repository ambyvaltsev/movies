import { Categories } from "../components/categories/Categories";
import { Main } from "../layout";
import {
  HomePage,
  Movies,
  Premiere,
  DigitalReleases,
  Movie,
  Staff,
  FilterMovies,
  MoviesList,
} from "../pages";

export const routes = [
  {
    path: "/",
    element: <Main />,
    child: [
      { path: "/", element: <HomePage />, index: true },
      {
        path: "movies",
        element: <Movies />,
        index: false,
        child: [
          { element: <Categories />, index: true },
          { path: ":category", element: <Categories />, index: false },
        ],
      },
      { path: "premiere", element: <Premiere />, index: false },
      { path: "digital", element: <DigitalReleases />, index: false },
      { path: "movie/:id", element: <Movie />, index: false },
      { path: "staff/:id", element: <Staff />, index: false },
      {
        path: ":id", element: <FilterMovies />, index: false, child: [
          {  element: <MoviesList />, index: true },
          { path: ":id", element: <MoviesList />, index: false },
      ] },
      
    ],
  },
];
