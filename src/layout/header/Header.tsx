import { FC } from "react";
import s from "./Header.module.scss";
import { SearchHeader, Burger, AccountHeader } from "../../components";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <div className={s.container}>
      <Link to="/">
        <span className={s.siteName}>Movies</span>
      </Link>
      <Burger />
      <SearchHeader />
      <AccountHeader />
    </div>
  );
};
