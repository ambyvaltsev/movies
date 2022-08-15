import { FC } from "react";
import s from "./Header.module.scss";
import { SearchHeader, MenuHeader } from "../../components";

export const Header: FC = () => {
  return (
    <div className={s.container}>
      <MenuHeader />
      <SearchHeader />
      <span className={s.account}></span>
    </div>
  );
};
