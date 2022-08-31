import s from "./RelatedInfoList.module.scss";
import { IoIosArrowForward } from "../../assets";
import { FC } from "react";
import { ISingleUnit } from "../../models";
import { Link } from 'react-router-dom';


interface IRelatedInfoListProps {
  movies?: ISingleUnit[];
  actors?: ISingleUnit[];
  title: string;
}

export const RelatedInfoList: FC<IRelatedInfoListProps> = ({ actors, movies, title }) => {
  return (
    <div className={s.container}>
      <div className={s.header}>
        <h3 className={s.header__title}>{title}</h3>
        <IoIosArrowForward className={s.header__icon} />
      </div>
      <div className={s.list}>
        {movies && movies.map((a, i) =>
          i < 10 ? (
            <Link to={`/movie/${a.id}`} key={i}><span key={i} className={s.list__name} data-clickable="true" data-card={a.id}>
              {a.nameEn || a.nameRu}
            </span> </Link>
          ) : null
        )}
        {actors && actors.map((a, i) =>
          i < 10 ? (
            <Link to={`/staff/${a.id}`} key={i}><span  className={s.list__name} data-clickable="true" data-card={a.id}>
              {a.nameEn || a.nameRu}
            </span></Link>
          ) : null
        )}
      </div>
    </div>
  );
};
