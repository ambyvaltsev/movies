import s from "./Kinopoisk.module.scss";
import { Star, Rating } from "../../../../components";
import { useState } from "react";
import { useGetMovieQuery } from "../../../../store/movies/movies.api";
import { useParams } from "react-router-dom";
import { useActions } from "../../../../hooks";

export const Kinopoisk = () => {
  const { rateMovie } = useActions();
  const [active, setActive] = useState(0);
  const [value, setValue] = useState(0);
  const { id } = useParams();
  const { kp } = useGetMovieQuery(id!, {
    selectFromResult: ({ data }) => ({
      kp: { rating: data?.ratingKinopoisk, votes: data?.ratingKinopoiskVoteCount },
    }),
  });

  const handleSelectedValue = (e: any) => {
    rateMovie({
      movieId: id,
      rating: e.target.dataset.value,
      date: new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" }),
    });
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
                selectValue={handleSelectedValue}
                rating={kp.rating}
                active={active}
                setActiveOver={() => setActive(el)}
                setActiveOut={() => setActive(0)}
                id={id!}
              />
            );
          })}
        </div>
        <Rating.Total rating={kp.rating} votes={kp.votes || ""} />
      </form>
      <Rating.MyRating />
    </div>
  );
};
