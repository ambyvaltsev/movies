import { FC } from "react";
import { Link } from "react-router-dom";

import { IInfoItem } from "../about/About";
import s from "./AboutItem.module.scss";

interface IAboutItemProps {
  item: IInfoItem

}

export const AboutItem: FC<IAboutItemProps> = ({ item }) => {

  return (
    <article className={s.container}>
      <div className={s.title} data-test>{item.title}</div>
      <div className={s.info}>
        {item.type === 'movie' && Array.isArray(item.movie) ? (
          item.movie.map((i, index) =>
            index < item.movie!.length - 1 ? (
              <span key={index} className={s.text} data-clickable={item.isClickable ? "true" : ""}>
                {i},{" "}
              </span>
            ) : (
              <span key={index} className={s.text} data-clickable={item.isClickable ? "true" : ""}>
                {i}
              </span>
            )
          )
        ) : (
          <span className={s.text}>{item.movie || item.person}</span>
        )}
        {item.staff && item.type === 'staff' &&
          item.staff.map((u, index: number) =>
            index < item.staff!.length - 1 ? (
              <Link to={`/staff/${u.id}`} key={index}>
                <span
                  className={s.text}
                  data-clickable={item.isClickable ? "true" : ""}
                  data-card={u.id}
                >
                  {u.nameEn || u.nameRu},{" "}
                </span>
              </Link>
            ) : (
              <Link to={`/staff/${u.id}`} key={index}>
                <span
                  className={s.text}
                  data-clickable={item.isClickable ? "true" : ""}
                  data-card={u.id}
                >
                  {u.nameEn || u.nameRu}
                </span>
              </Link>
            )
          )}
      </div>
    </article>
  );
};
