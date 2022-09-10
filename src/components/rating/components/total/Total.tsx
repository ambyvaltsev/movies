import { FC } from "react";
import s from "./Total.module.scss";

interface ITotalProps {
  rating: string | number;
  votes: number | string;
  styleRating?: { [k: string]: string };
  styleVotes?: { [k: string]: string };
}

export const Total: FC<ITotalProps> = ({ rating, votes, styleRating, styleVotes }) => {
  return (
    <>
      {rating ? (
        <div className={s.container}>
          <span className={s.rating} style={styleRating}>
            {rating}
          </span>
          <span className={s.votes} style={styleVotes}>{`${votes} votes`}</span>
        </div>
      ) : null}
    </>
  );
};
