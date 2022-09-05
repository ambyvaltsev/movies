import { FC, ReactNode } from "react";
import { Description, Rating, ReleaseDate, ShortInfo, ShortMovieInfo } from "./components";
import s from "./Card.module.scss";
import { Poster } from "../../components";

interface ICardExtensions {
  Description: typeof Description;
  ReleaseDate: typeof ReleaseDate;
  Rating: typeof Rating;
  ShortMovieInfo: typeof ShortMovieInfo;
  ShortInfo: typeof ShortInfo;
}

interface ICardProps {
  children: ReactNode;
  poster: string;
  alt: string;
  style?: { [k: string]: string };
}

export const Card: FC<ICardProps> & ICardExtensions = ({ children, poster, alt, style }) => {
  return (
    <div className={s.container} style={style}>
      <Poster url={poster} alt={alt} />
      {children}
    </div>
  );
};

Card.Description = Description;
Card.ReleaseDate = ReleaseDate;
Card.Rating = Rating;
Card.ShortMovieInfo = ShortMovieInfo;
Card.ShortInfo = ShortInfo;
