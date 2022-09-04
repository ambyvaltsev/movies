import s from "./Details.module.scss";
import { FC } from "react";

interface IDetailsProps {
  rating: string;
  year: string;
  genres: { genre: string }[];
}

export const Details: FC<IDetailsProps> = ({ genres, rating, year }) => {
  const genre = genres
    .map((m) => Object.values(m).map((m) => m))
    .splice(0, 2)
    .join(", ");
  return (
    <div className={s.container}>
      <span className={s.rating}>{rating === "null" ? "" : rating}</span>
      <span className={s.genres}>{genre}</span>
      <span className={s.year}>{year}</span>
    </div>
  );
};
