import { FC } from "react";
import s from "./Category.module.scss";
/* import img from '../../assets/img/best250.png' */
interface CategoryInfo {
  posterUrl: any;
  title: string;
  key: string;
  total?: number;
}

interface ICategoryProps {
  info: CategoryInfo;
}

export const Category: FC<ICategoryProps> = ({ info }) => {
  return (
    <article className={s.container}>
      <div className={s.poster}>
        <img src={info.posterUrl} alt={info.title} />
      </div>
      <div className={s.info}>
        <span className={s.info__title}>{info.title}</span>
        <span className={s.info__total}>{info.total}</span>
      </div>
    </article>
  );
};
