import { FC, ReactNode } from "react";
import { Description, ReleaseDate, ShortInfo, ShortMovieInfo, RatingBadge, FavoriteBadge } from "./components";
import s from "./Card.module.scss";


interface ICardExtensions {
  Description: typeof Description;
  ReleaseDate: typeof ReleaseDate;
  ShortMovieInfo: typeof ShortMovieInfo;
  ShortInfo: typeof ShortInfo;
  RatingBadge: typeof RatingBadge;
  FavoriteBadge: typeof FavoriteBadge
}

interface ICardProps {
  children: ReactNode;
  style?: { [k: string]: string };
}

export const Card: FC<ICardProps> & ICardExtensions = ({ children, style }) => {
  return (
    <article className={s.container} style={style}>
      {children}
    </article>
  );
};

Card.Description = Description;
Card.ReleaseDate = ReleaseDate;
Card.ShortMovieInfo = ShortMovieInfo;
Card.ShortInfo = ShortInfo;
Card.RatingBadge = RatingBadge;
Card.FavoriteBadge = FavoriteBadge
