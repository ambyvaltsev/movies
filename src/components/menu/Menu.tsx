import { FC } from "react";
import s from "./Menu.module.scss";
import { Link } from "react-router-dom";

export const Menu: FC = () => {
  return (
    <div className={s.container}>
      <ul>
        <Link to='/'><li>Home</li></Link>
        <Link to='movies'><li>Movies</li></Link>
        <Link to='series'><li>TV series</li></Link>
      </ul>
    </div>
  );
};
