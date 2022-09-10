import s from "./Kinopoisk.module.scss";
import { Total } from "../../components";
import { Star } from "../../../../components";
import { useState } from "react";
import { useGetMovieQuery } from "../../../../store/movies/movies.api";
import { useParams } from "react-router-dom";

export const Kinopoisk = () => {
  const [active, setActive] = useState(0);
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
      <h4 className={s.title}>Kinopoisk</h4>
      <form className={s.form}>
        <div className={s.badges}>
          {Array.from({ length: 10 }, (x, i) => i + 1).map((el, i) => {
            return (
              <Star
                key={i}
                radioNum={el}
                value={value}
                selectValue={handleSelectValue}
                rating={kp.rating}
                active={active}
                setActiveOver={() => setActive(el)}
                setActiveOut={() => setActive(0)}
                id={id!}
              />
            );
          })}
        </div>
        <Total rating={kp.rating} votes={kp.votes || ''} />
      </form>
    </div>
  );
};
