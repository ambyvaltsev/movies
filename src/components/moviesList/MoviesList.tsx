import { FC } from "react";
import {  IRelease } from "../../models";
import { MoviesListItem } from "../../pages/homePage/components";
import s from "./MoviesList.module.scss";

interface IReleaseListProps {
  data: IRelease[] 
  limit?: number;
}

export const MoviesList: FC<IReleaseListProps> = ({ data, limit = 5 }) => {
  
    
  return (
    <div className={s.container}>
      <ul className={s.list}>
        {data && data.map((item, index) => {
          if (index < limit) {
            return <MoviesListItem key={item.id} index={index} {...item} />;
          }
        })}
      </ul>
    </div>
  );
};
