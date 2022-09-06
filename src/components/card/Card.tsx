import { FC, ReactNode } from "react";
import { Description, Rating, ReleaseDate, ShortInfo, ShortMovieInfo, ScoreBadge, FavoriteBadge } from "./components";
import s from "./Card.module.scss";


interface ICardExtensions {
  Description: typeof Description;
  ReleaseDate: typeof ReleaseDate;
  Rating: typeof Rating;
  ShortMovieInfo: typeof ShortMovieInfo;
  ShortInfo: typeof ShortInfo;
  ScoreBadge: typeof ScoreBadge;
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
Card.Rating = Rating;
Card.ShortMovieInfo = ShortMovieInfo;
Card.ShortInfo = ShortInfo;
Card.ScoreBadge = ScoreBadge;
Card.FavoriteBadge = FavoriteBadge
