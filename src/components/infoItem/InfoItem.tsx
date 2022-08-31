import { FC } from "react";
import { Link } from "react-router-dom";
import { ISingleUnit } from "../../models";
import s from "./InfoItem.module.scss";

interface IInfoItemProps {
  title: string;
  info?: string[] | string | number;
  isClickable?: boolean;
  staff?: ISingleUnit[];
}

export const InfoItem: FC<IInfoItemProps> = ({ title, info, isClickable, staff }) => {
  return (
    <div className={s.container}>
      <div className={s.title}>{title}</div>
      <div className={s.info}>
        {info && Array.isArray(info) ? (
          info.map((i, index) =>
            index < info.length - 1 ? (
              <span key={index} className={s.text} data-clickable={isClickable ? "true" : ""}>
                {i},{" "}
              </span>
            ) : (
              <span key={index} className={s.text} data-clickable={isClickable ? "true" : ""}>
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
              <Link to={`/staff/${u.id}`} key={index}>
                <span
                  className={s.text}
                  data-clickable={isClickable ? "true" : ""}
                  data-card={u.id}
                >
                  {u.nameEn || u.nameRu},{" "}
                </span>
              </Link>
            ) : (
              <Link to={`/staff/${u.id}`} key={index}>
                <span
                  className={s.text}
                  data-clickable={isClickable ? "true" : ""}
                  data-card={u.id}
                >
                  {u.nameEn || u.nameRu}
                </span>
              </Link>
            )
          )}
      </div>
    </div>
  );
};
