import { FC } from "react";
import { Link } from "react-router-dom";
import s from "./ReleaseItem.module.scss";

interface IReleaseItemProps {
  poster: string;
  nameRu: string;
  date: string;
  index: number;
  nameEn: string;
  id: string
}

export const ReleaseItem: FC<IReleaseItemProps> = ({ poster, nameRu, nameEn, date, index, id }) => {
  return (
    <li className={s.container}>
      <span className={s.index}>{index + 1}.</span>
      <div className={s.poster}>
        <img src={poster} alt={nameRu} />
      </div>
      <div className={s.names}>
        <Link to={`${id}`}><span className={s.names__ru}>{nameRu}</span></Link>
        <span className={s.names__en}>{nameEn}</span>
      </div>

      <div className={s.date}>
        <span className={s.day}>{+date.split("-")[2]}</span>
        <span className={s.day}>{new Date(date).toLocaleString("en-US", { month: "long" })}</span>
      </div>
    </li>
  );
};
