import { useAppDispatch, useAppSelector } from "../../../../hooks";

import s from "./Ratings.module.scss";
import { useEffect, useState } from "react";
import { IMovie } from "../../../../store/movies/types";

import { fetchRatedMovies } from "../../../../store/movies/movies.api";
import { Card, Poster } from "../../../../components";

export const Ratings = () => {
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<IMovie[]>([]);

  const { ratedMovies } = useAppSelector((state) => state.user);
  const averageRating =
    ratedMovies.length > 0
      ? ratedMovies.reduce((acc, cur) => {
          return acc + +cur.rating;
        }, 0) / ratedMovies.length
      : 0;
  useEffect(() => {
    dispatch(fetchRatedMovies(5))
      .unwrap()
      .then((res) => setMovies(res));
  }, []);

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
              <td className={s.table__data}>{averageRating}</td>
            </tr>
            <tr className={s.table__row}>
              <td className={s.table__data}>First entry</td>
              <td className={s.table__data}>Value</td>
            </tr>
            <tr className={s.table__row}>
              <td className={s.table__data}>Last entry</td>
              <td className={s.table__data}>Value</td>
            </tr>
          </tbody>
        </table>
      </section>
      <section className={s.history}>
        <h2 className={s.history__title}>History rating</h2>
        <div className={s.history__box}>
          <div className={s.box__header}>
            <span className={s.box__headerItem}>{"\u2116"}</span>
            <span className={s.box__headerItem}>Film</span>
            <span className={s.box__headerItem}>Date</span>
            <span className={s.box__headerItem}>Rating</span>
          </div>
          <div className={s.box__list}>
            {movies &&
              movies.map((movie, index) => (
                <Card style={{ gridTemplateColumns: "30px 60px 1fr 50px 40px" }}>
                  <div>{index + 1}</div>
                  <Poster url={movie.posterUrl} alt={movie.nameEn || movie.nameRu} />
                  <Card.Description
                    title={movie.nameEn || movie.nameRu}
                    subtitle={movie.nameEn && movie.nameRu}
                  />
                  <div>
                    
                  </div>
                </Card>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};
