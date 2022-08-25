import { FC } from "react";
import { IStaffUnit } from "../../../../models";
import s from "./MovieInfoItem.module.scss";

interface IMovieInfoItemProps {
  title: string;
  info?: string[] | string | number;
  isClickable?: boolean;
  staff?: IStaffUnit[];
}

export const MovieInfoItem: FC<IMovieInfoItemProps> = ({ title, info, isClickable, staff }) => {
  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>
      <div className={s.info}>
        {info && Array.isArray(info) ? (
          info.map((i, index) =>
            index < info.length - 1 ? (
              <span
                key={index}
                className={s.text}
                data-clickable={isClickable ? "true" : ""}
                data-card="true"
              >
                {i},{" "}
              </span>
            ) : (
              <span
                key={index}
                className={s.text}
                data-clickable={isClickable ? "true" : ""}
                data-card="true"
              >
                {i}
              </span>
            )
          )
        ) : (
          <span className={s.text}>{info}</span>
        )}
        {staff &&
          staff.map((u, index) =>
            index < staff.length - 1 ? (
              <span
                key={index}
                className={s.text}
                data-clickable={isClickable ? "true" : ""}
                data-card={u.id}
              >
                {u.nameEn || u.nameRu},{" "}
              </span>
            ) : (
              <span
                key={index}
                className={s.text}
                data-clickable={isClickable ? "true" : ""}
                data-card={u.id}
              >
                {u.nameEn || u.nameRu}
              </span>
            )
          )}
      </div>
    </div>
  );
};
