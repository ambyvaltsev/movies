import { Account } from "../components/account/Account";
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
  Auth,
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
        path: "lists",
        element: <Movies />,
        index: false,
      },
      { path: "all", element: <MoviesAll />, index: false },
      { path: "best250", element: <MoviesTop />, index: false },
      {
        path: "auth/signin",
        element: <Auth />,
        index: false,
        child: [
          { element: <Account.SignIn />, index: true },
          { path: "auth/signup", element: <div>wewefwefwefwefwef</div>, index: false },
        ],
      },
    ],
  },
];
