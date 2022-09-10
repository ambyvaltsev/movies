import s from "./Critics.module.scss";
import { useParams } from "react-router-dom";
import { useGetMovieQuery } from "../../../../store/movies/movies.api";
import { Total } from "../../components";

export const Critics = () => {
  const { id } = useParams();
  const { critics } = useGetMovieQuery(id!, {
    selectFromResult: ({ data }) => ({
      critics: { rating: data?.ratingFilmCritics, count: data?.ratingFilmCriticsVoteCount },
    }),
  });
  const positivePercent = Math.round(critics.rating * 10);
  const positiveCount = critics.count ? Math.round((critics.count * critics.rating) / 10) : 0;
  const negativeCount = critics.count ? critics.count - positiveCount : 0;

  return (
    <div className={s.container}>
      <h4 className={s.title}>World Film Critics Rating</h4>
      <div className={s.rating}>
        <div className={s.scale}>
          <div className={s.scale__positive} style={{ width: `${critics.rating * 10}%` }}>
            {positiveCount || ''}
          </div>
          <div className={s.scale__negative} style={{ width: `${100 - critics.rating * 10}%` }}>
            {negativeCount || ''}
          </div>
        </div>
        <Total rating={positivePercent ? `${positivePercent}%` : ''} votes={critics.count || ''} />
      </div>
    </div>
  );
};
