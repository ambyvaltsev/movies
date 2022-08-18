import { FC } from "react";
import { IReleaseData } from "../../models";
import { MoviesListItem } from "../../pages/homePage/components";
import s from "./MoviesList.module.scss";

interface IReleaseListProps {
  listData: IReleaseData[];
  limit?: number;
}

export const MoviesList: FC<IReleaseListProps> = ({ listData, limit = 5 }) => {
  return (
    <div className={s.container}>
      <ul className={s.list}>
        {listData?.map((item, index) => {
          if (index < limit) {
            return <MoviesListItem key={item.id} index={index} {...item} />;
          }
        })}
      </ul>
    </div>
  );
};
