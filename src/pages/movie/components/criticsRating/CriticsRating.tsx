import { useParams } from "react-router-dom";
import { useGetMovieQuery } from "../../../../store/movies/movies.api";
import s from "./CriticsRating.module.scss";

export const CriticsRating = () => {
  const { id } = useParams();
  const { critics } = useGetMovieQuery(id!, {
    selectFromResult: ({ data }) => ({
      critics: { rating: data?.ratingFilmCritics, count: data?.ratingFilmCriticsVoteCount },
    }),
  });
  const positivePercent = Math.round(critics.rating * 10)
  const positiveCount = critics.count ? Math.round((critics.count * critics.rating) / 10) : 0;
  const negativeCount = critics.count ? critics.count - positiveCount : 0;
  return (
    <div className={s.container}>
      <h4 className={s.title}>World Film Critics Rating</h4>
      <div className={s.scale}>
        <div className={s.scale__positive} style={{ width: `${critics.rating * 10}%` }}>
          {positiveCount}
        </div>
        <div className={s.scale__negative} style={{ width: `${100 - critics.rating * 10}%` }}>
          {negativeCount}
        </div>
      </div>
      <div className={s.total}>
        <span className={s.total__percent}>{`${positivePercent}%`}</span>
        <span className={s.total__votes}>{`${critics.count} votes`}</span>
      </div>
    </div>
  );
};
