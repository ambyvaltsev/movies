import { Routes } from "react-router-dom";
import { privateRoutes, publicRoutes } from "../../router";
import { mapRoutes } from "../../helpers";
import { FC } from "react";
import { useAppSelector } from "../../hooks";

export const AppRoutes: FC = () => {
  const isAuth = useAppSelector((state) => state.auth.entities.isAuth);
  return <Routes>{isAuth ? mapRoutes(privateRoutes) : mapRoutes(publicRoutes)}</Routes>;
};
