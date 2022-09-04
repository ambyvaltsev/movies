import { FC, ReactNode } from "react";
import { Critics, Kinopoisk } from "./components";
import s from "./Rating.module.scss";

interface IRatingExtension {
  Kinopoisk: typeof Kinopoisk;
  Critics: typeof Critics;
}

interface IRatingProps {
  children: ReactNode;
}

export const Rating: FC<IRatingProps> & IRatingExtension = ({ children }) => {
  return (
    <div className={s.container}>
      <h3 className={s.title}>Movie ratings</h3>
      <div className={s.ratings}>{children}</div>
    </div>
  );
};

Rating.Kinopoisk = Kinopoisk;
Rating.Critics = Critics;
