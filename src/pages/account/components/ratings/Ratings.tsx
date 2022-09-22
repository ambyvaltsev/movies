import { useAppDispatch, useAppSelector } from "../../../../hooks";
import { useInView } from "react-intersection-observer";
import s from "./Ratings.module.scss";
import { useEffect, useState } from "react";
import { IMyRatedMovie } from "../../../../store/movies/types";
import { fetchRatedMovies } from "../../../../store/movies/movies.api";
import { Card, Poster } from "../../../../components";
import { Link } from "react-router-dom";

export const Ratings = () => {
  const [length, setLength] = useState({ start: 0, end: 4 });
  const { ref, inView, entry } = useInView();
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
                <Link to={`/movie/${movie.kinopoiskId}`} key={index}>
                  <Card style={{ gridTemplateColumns: "20px 50px 1fr 50px 50px auto" }}>
                    <div className={s.list__item}>{index + 1}</div>
                    <Poster url={movie.posterUrl} alt={movie.nameEn || movie.nameRu} />
                    <Card.Description
                      title={movie.nameEn || movie.nameOriginal || movie.nameRu}
                      subtitle={(movie.nameEn || movie.nameOriginal) && movie.nameRu}
                    />
                    <div className={s.list__item}>
                      {new Date(movie.date).toLocaleString("en-US", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className={s.list__item}>{movie.rating}</div>
                    {index === movies.length - 1 ? <div ref={ref}></div> : null}
                  </Card>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </div>
  );
};
