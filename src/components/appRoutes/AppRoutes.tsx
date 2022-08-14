import { Routes } from "react-router-dom";
import { routes } from "../../router";
import { mapRoutes } from "../../helpers";
import { FC } from "react";

export const AppRoutes: FC = () => {
  return <Routes>{mapRoutes(routes)}</Routes>;
};
