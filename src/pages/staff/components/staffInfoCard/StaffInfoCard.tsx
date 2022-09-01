import { useGetMovieQuery} from "../../../../store/movies/movies.api";
import s from "./StaffInfoCard.module.scss";
import { FC } from "react";

interface IInfo {
  id: string;
  x: number;
  y: number;
}
interface IStaffInfoCardProps {
  info: IInfo;
}

export const StaffInfoCard: FC<IStaffInfoCardProps> = ({ info }) => {
  const { isError, isLoading, data } = useGetMovieQuery(info.id)
  return (
    <div className={s.container} style={{ top: `${info.y + 10}px`, left: `${info.x + 10}px` }}>
      <div className={s.poster}>
        <img src={data?.posterUrl} alt={data?.nameEn || data?.nameRu} />
      </div>
      <div className={s.description}>
        <h6 className={s.description__name}>{data?.nameEn || data?.nameRu}</h6>
        <p className={s.description__details}>
          <span className={s.details__title}>Genre: </span>
          {data?.genres.join(', ')}
        </p>
        <p className={s.description__details}>
          <span className={s.details__title}>Year: </span>
          {data?.year}
        </p>
        <p className={s.description__details}>
          <span className={s.details__title}>Kinopoisk raiting: </span>
          {data?.ratingKinopoisk}
        </p>
      </div>
    </div>
  );
};
