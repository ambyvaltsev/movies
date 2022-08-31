import { Main } from "../layout";
import { HomePage, Movies, Premiere, DigitalReleases, Movie, Staff } from "../pages";

export const routes = [
  {
    path: "/",
    element: <Main />,
    child: [
      { path: "/", element: <HomePage /> },
      { path: "movies", element: <Movies /> },
      { path: "premiere", element: <Premiere /> },
      { path: "digital", element: <DigitalReleases /> },
      { path: "movie/:id", element: <Movie /> },
      { path: "staff/:id", element: <Staff /> },

    ],
  },
];
