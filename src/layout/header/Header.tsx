import { FC } from "react";
import s from "./Header.module.scss";
import { Link } from "react-router-dom";
import { Input } from "../../components/UI";

export const Header: FC = () => {
  return (
    <div className={s.container}>
      <Link to="/">
        <span className={s.logo}>Movies</span>
      </Link>
      <Input main placeholder='Movies, TV series' autocomplete="off"/>
    </div>
  );
};
