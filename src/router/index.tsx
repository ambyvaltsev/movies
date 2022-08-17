import { Main } from "../layout";
import { HomePage, Movies, Premiere } from "../pages";

export const routes = [
  {
    path: "/",
    element: <Main />,
    child: [
      { path: "/", element: <HomePage /> },
      { path: "movies", element: <Movies /> },
      { path: "premiere", element: <Premiere /> },
    ],
  },
];
