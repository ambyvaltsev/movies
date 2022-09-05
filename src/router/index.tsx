import { Categories } from "../components/categories/Categories";
import { Main } from "../layout";
import {
  HomePage,
  MovieLists,
  Premiere,
  DigitalReleases,
  Movie,
  Staff,
  Movies,
  MoviesAll,
  MoviesTop,
} from "../pages";

export const routes = [
  {
    path: "/",
    element: <Main />,
    child: [
      { path: "/", element: <HomePage />, index: true },
      {
        path: "lists",
        element: <MovieLists />,
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
        path: "movies",
        element: <Movies />,
        index: false,
        child: [
          { element: <MoviesAll />, index: true },
          { path: ":id", element: <MoviesTop />, index: false },
        ],
      },
    ],
  },
];
