import { FC } from "react";
import s from "./Header.module.scss";
import { Search, Burger, Account } from "../../components";
import { Link } from "react-router-dom";

export const Header: FC = () => {
  return (
    <div className={s.container}>
      <div className={s.content}>
        <Link to="/">
          <span className={s.siteName}>Movies</span>
        </Link>
        <Burger />
        <Search />
        <Account>
          <Account.SignIn />
        </Account>
      </div>
    </div>
  );
};
