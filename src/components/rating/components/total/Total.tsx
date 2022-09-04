import { FC } from "react";
import s from "./Total.module.scss";

interface ITotalProps {
  rating: string;
  votes: number;
}

export const Total: FC<ITotalProps> = ({ rating, votes }) => {
  return (
    <div className={s.container}>
      <span className={s.rating}>{rating}</span>
      <span className={s.Votes}>{`${votes} votes`}</span>
    </div>
  );
};
