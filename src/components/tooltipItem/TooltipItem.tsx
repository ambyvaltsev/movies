import s from "./TooltipItem.module.scss";
import { FC } from "react";
import { IMovieShortInfo, IPersonsShortInfo } from "../../models";
import { Link } from "react-router-dom";

interface ITooltipItemProps {
  movie?: IMovieShortInfo;
  person?: IPersonsShortInfo;
}

export const TooltipItem: FC<ITooltipItemProps> = ({ movie, person }) => {
  const genres = movie?.genres
    .map((m) => Object.values(m).map((m) => m))
    .splice(0, 2)
    .join(", ");
  return (
    <div className={s.container}>
      <div className={s.poster}>
        {movie && <img src={movie?.posterUrl} alt={movie?.nameEn || movie?.nameRu} />}
        {person && <img src={person?.posterUrl} alt={person?.nameEn || person?.nameRu} />}
      </div>
      <div className={s.details}>
        {movie && (
          <Link to={`/movie/${movie?.filmId}`}>
            <h6 className={s.details__title}>{movie?.nameEn || movie?.nameRu}</h6>
          </Link>
        )}
        {person && (
          <Link to={`/staff/${person?.kinopoiskId}`}>
            <h6 className={s.details__title}>{person?.nameEn || person?.nameRu}</h6>
          </Link>
        )}
        <div className={s.details__description}>
          <span className={s.description__rating}>{movie?.rating === "null" ? "" : movie?.rating}</span>
          <span className={s.description__genres}>{genres}</span>
          <span className={s.description__year}>{movie?.year}</span>
        </div>
      </div>
    </div>
  );
};
