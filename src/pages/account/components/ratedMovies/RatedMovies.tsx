import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useInView } from "react-intersection-observer";
import s from "./RatedMovies.module.scss";
import { useEffect, useState } from "react";
import { IMyRatedMovie } from "../../../../store/movies/types";
import { fetchRatedMovies } from "../../../../store/movies/movies.api";
import { UserMovies } from "..";

export const RatedMovies = () => {
  const [length, setLength] = useState({ start: 0, end: 2 });
  const { ref, inView } = useInView();
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<IMyRatedMovie[]>([]);

  const { ratedMovies } = useAppSelector((state) => state.user);
  const averageRating =
    ratedMovies.length > 0
      ? ratedMovies.reduce((acc, cur) => {
          return acc + +cur.rating;
        }, 0) / ratedMovies.length
      : 0;

  useEffect(() => {
    dispatch(fetchRatedMovies(length))
      .unwrap()
      .then((res) => {
        if (movies.length === 0) {
          setMovies(res);
        } else {
          setMovies((prev) => [...prev, ...res]);
        }
      });
  }, [length]);

  useEffect(() => {
    if (length.end < movies.length) {
      setLength((prev) => ({ start: prev.end + 1, end: prev.end + 3 }));
    }
  }, [inView]);

  return (
    <div className={s.container}>
      <section className={s.stat}>
        <h2 className={s.stat__title}>Ratings in numbers</h2>
        <table className={s.stat__table}>
          <tbody className={s.table__body}>
            <tr className={s.table__row}>
              <td className={s.table__data}>Total movies</td>
              <td className={s.table__data}>{ratedMovies.length}</td>
            </tr>
            <tr className={s.table__row}>
              <td className={s.table__data}>Average rating</td>
              <td className={s.table__data}>{averageRating.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </section>
      <UserMovies movies={movies} title='History rating' rating ref={ref} />
    </div>
  );
};
