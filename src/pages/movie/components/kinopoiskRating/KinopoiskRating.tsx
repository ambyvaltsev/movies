import s from "./KinopoiskRating.module.scss";
import { StarBadge } from "./StarBadge";
import { useEffect, useRef, useState } from "react";
import { useGetMovieQuery } from "../../../../store/movies/movies.api";
import { useParams } from "react-router-dom";

export const KinopoiskRating = () => {
  const [active, setActive] = useState(0)
  const [value, setValue] = useState(0);

  const { id } = useParams();
  const { kp } = useGetMovieQuery(id!, {
    selectFromResult: ({ data }) => ({
      kp: { rating: data?.ratingKinopoisk, votes: data?.ratingKinopoiskVoteCount },
    }),
  });


  const handleSelectValue = (e: any) => {
    setValue(e.target.dataset.value);
  };


  return (
    <div className={s.container}>
      <form className={s.form}>
        <div className={s.form__rating}>
          <div className={s.rating__badges}>
            {Array.from({ length: 10 }, (x, i) => i + 1).map((el, i) => {
              return (
                <StarBadge
                  key={i}
                  radioNum={el}
                  value={value}
                  selectValue={handleSelectValue}
                  rating={kp.rating}
                  active={active}
                  setActiveOver={() => setActive(el)}
                  setActiveOut={() => setActive(0)}
                />
              );
            })}
          </div>
          <div className={s.rating__values}>
            <span className={s.values__rating}>{kp.rating}</span>
            <span className={s.values__totalVotes}>{`${kp.votes} votes`}</span>
          </div>
        </div>
      </form>
      <div></div>
    </div>
  );
};
