import { FC, useEffect } from "react";
import { useGetSpecificStaffQuery } from "../../../../store/movies/movies.api";
import s from "./StaffCard.module.scss";
interface IStaffInfo {
  id: string;
  x: number;
  y: number;
}
interface IStaffCardProps {
  staffInfo: IStaffInfo;
}

export const StaffCard: FC<IStaffCardProps> = ({ staffInfo }) => {
  const { isError, isLoading, data } = useGetSpecificStaffQuery(staffInfo.id!);

  const bestMovies =
    data && data?.films.length > 0
      ? data?.films
          .filter((film) => film.rating)
          .sort((a, b) => +b.rating - +a.rating)
          .reduce((acc: any, cur) => {
            return [...acc, cur.nameEn];
          }, [])
          .slice(0, 10)
          .join(", ")
      : "";

  return (
    <div className={s.container} style={{ top: `${staffInfo.y + 5}px`, left: `${staffInfo.x + 5}px` }}>
      <div className={s.poster}>
        <img src={data?.posterUrl} alt={data?.nameEn || data?.nameRu} />
      </div>
      <div className={s.details}>
        <h6 className={s.details__name}>{data?.nameEn || data?.nameRu}</h6>
        <div className={s.details__profession}>{data?.profession}</div>
        <p className={s.details__bestMovies}>
          <span className={s.bestMovies__title}>Best movies: </span>
          {bestMovies}
        </p>
      </div>
    </div>
  );
};
