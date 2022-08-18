import { FC } from "react";
import s from "./MoviesListItem.module.scss";

interface IMoviesListItemProps {
  poster: string;
  nameRu: string;
  date: string;
  index: number;
  nameEn: string;
}

export const MoviesListItem: FC<IMoviesListItemProps> = ({ poster, nameRu, nameEn, date, index }) => {
  return (
    <li className={s.container}>
      <span className={s.index}>{index + 1}.</span>
      <div className={s.poster}>
        <img src={poster} alt={nameRu} />
      </div>
      <div className={s.names}>
        <span className={s.names__ru}>{nameRu}</span>
        <span className={s.names__en}>{nameEn}</span>
      </div>

      <div className={s.date}>
        <span className={s.day}>{+date.split("-")[2]}</span>
        <span className={s.day}>{new Date(date).toLocaleString("en-US", { month: "long" })}</span>
      </div>
    </li>
  );
};
