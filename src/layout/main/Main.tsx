import { FC } from "react";
import { Outlet } from "react-router-dom";
import s from "./Main.module.scss";

export const Main: FC = () => {
  return (
    <div className={s.container}>
      <Outlet/>
    </div>
  );
};
