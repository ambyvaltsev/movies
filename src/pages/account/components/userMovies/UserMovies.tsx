import s from "./UserMovies.module.scss";
import { Card, Poster } from "../../../../components";
import { Link } from "react-router-dom";
import { IMyRatedMovie } from "../../../../store/movies/types";
import { forwardRef } from "react";

interface IUserMoviesProps {
  movies: IMyRatedMovie[];
  rating?: boolean;
  title: string
}

export const UserMovies = forwardRef<HTMLDivElement, IUserMoviesProps>(({ movies, rating, title }, ref) => {
  return (
    <section className={s.container}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.box}>
        <div className={s.box__header}>
          <span className={s.box__headerItem}>{"\u2116"}</span>
          <span className={s.box__headerItem}>Film</span>
          {rating ? <span className={s.box__headerItem}>Your rating</span> : <div></div>}
          <span className={s.box__headerItem}>Date</span>
        </div>
        <div className={s.box__list}>
          {movies &&
            movies.map((movie, index) => (
              <Link to={`/movie/${movie.kinopoiskId}`} key={index}>
                <Card style={{ gridTemplateColumns: "25px 50px 1fr 40px 60px" }}>
                  <div className={s.list__item}>{index + 1}</div>
                  <Poster url={movie.posterUrl} alt={movie.nameEn || movie.nameRu} />
                  <Card.Description
                    title={movie.nameEn || movie.nameOriginal || movie.nameRu}
                    subtitle={(movie.nameEn || movie.nameOriginal) && movie.nameRu}
                  />
                  <div className={s.list__item}>{movie.rating}</div>
                  <div className={s.list__item}>
                    {new Date(movie.date).toLocaleString("en-US", {
                      day: "numeric",
                      month: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </Card>
                {index === movies.length - 1 ? <div ref={ref}></div> : null}
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
});
