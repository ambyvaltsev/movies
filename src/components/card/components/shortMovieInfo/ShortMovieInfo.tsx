import s from "./ShortMovieInfo.module.scss";
import { FC } from "react";

interface IShortMovieInfoProps {
  rating: string;
  year: string;
  genres: { genre: string }[];
}

export const ShortMovieInfo: FC<IShortMovieInfoProps> = ({ genres, rating, year }) => {
  const genre = genres
    .map((m) => Object.values(m).map((m) => m))
    .splice(0, 2)
    .join(", ");
  return (
    <div className={s.container}>
      <span className={s.rating}>{rating === "null" ? "" : rating}</span>
      <span className={s.other}>{genre}, {year}</span>
    </div>
  );
};
