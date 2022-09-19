import { SignIn, SignUp } from "../pages/auth/components";
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
  Account,
} from "../pages";
import { Profile, Ratings } from "../pages/account/components";

export const publicRoutes = [
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
        path: "auth",
        element: <Auth />,
        index: false,
        child: [
          { element: <SignIn />, index: true },
          { path: "/auth/signup", element: <SignUp />, index: false },
        ],
      },
      { path: "*", element: <div>Page Not Found</div>, index: false },
    ],
  },
];

export const privateRoutes = [
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
        path: "auth",
        element: <Auth />,
        index: false,
        child: [
          { element: <SignIn />, index: true },
          { path: "/auth/signup", element: <SignUp />, index: false },
        ],
      },
      {
        path: "/account",
        element: <Account />,
        child: [
          { path: "account", element: <Profile />, index: true },
          { path: "ratings", element: <Ratings />, index: false },
        ],
      },
      { path: "*", element: <div>Page Not Found</div>, index: false },
    ],
  },
];
