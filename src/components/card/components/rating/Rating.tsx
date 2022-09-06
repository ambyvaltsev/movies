import s from "./Rating.module.scss";
import { FC } from "react";

interface IRatingProps {
  rating: number;
  votes?: number;
}

export const Rating: FC<IRatingProps> = ({ rating, votes }) => {
  return (
    <div className={s.container}>
      <div className={s.rating}>
        <span className={s.rating__number}>{rating}</span>
        {votes && <span className={s.rating__votesCount}>{votes} votes</span>}
      </div>
    </div>
  );
};
