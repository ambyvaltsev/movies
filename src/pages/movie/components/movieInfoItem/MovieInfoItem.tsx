import { FC } from "react";
import { IStaffUnit } from "../../../../models";
import s from "./MovieInfoItem.module.scss";

interface IMovieInfoItemProps {
  title: string;
  info: string[] | string | number;
}

export const MovieInfoItem: FC<IMovieInfoItemProps> = ({ title, info }) => {
  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>
      <div className={s.info}>
        {Array.isArray(info) ? (
          info.map((i, index) =>
            index < info.length - 1 ? (
              <span key={index} className={s.text}>{i}, </span>
            ) : (
              <span key={index} className={s.text}>{i}</span>
            )
          )
        ) : (
          <span className={s.text}>{info}</span>
        )}
      </div>
    </div>
  );
};
