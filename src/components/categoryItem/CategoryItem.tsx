import { FC } from "react";
import { Link } from "react-router-dom";
import { ICategoryItem } from "../../helpers/vars";
import s from "./CategoryItem.module.scss";

interface ICategoryItemProps {
  info: ICategoryItem;
}

export const CategoryItem: FC<ICategoryItemProps> = ({ info }) => {
  return (
    <Link to={`/${info.id}`}>
      <article className={s.container}>
        <div className={s.poster}>
          <img src={info.posterUrl} alt={info.title} />
        </div>
        <div className={s.info}>
          <span className={s.info__title}>{info.title}</span>
          <span className={s.info__total}>{info.total}</span>
        </div>
      </article>
    </Link>
  );
};
