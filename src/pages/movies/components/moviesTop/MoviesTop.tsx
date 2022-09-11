import s from "./MoviesTop.module.scss";
import { Card, Poster } from "../../../../components";
import { useGetTopMoviesQuery } from "../../../../store/movies/movies.api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useScrollMovies } from "../../../../hooks";
import { IMovieShortInfo, ITopMoviesResponse } from "../../../../models";
export const MoviesTop = () => {
  const [params, setParams] = useState({
    type: "TOP_250_BEST_FILMS",
    page: 1,
  });
  const { isError, isLoading, data } = useGetTopMoviesQuery(params);

  const { ref, movies } = useScrollMovies<any, { type: string; page: number }, IMovieShortInfo>(
    data!,
    params.page,
    data?.pages!,
    setParams
  );
  return (
    <div className={s.container}>
      <section className={s.movies}>
        <h1 className={s.title}>Top 250 best movies</h1>
        <ul className={s.movies__list}>
          {movies &&
            movies.map((film, index) => {
              return (
                <Card style={{ alignItems: "start" }} key={index}>
                  <Link to={`/movie/${film.filmId}`}>
                    <Poster
                      url={film.posterUrl}
                      alt={film.nameEn || film.nameRu}
                      style={{ height: "105px" }}
                    />
                  </Link>
                  <Link to={`/movie/${film.filmId}`}>
                    <Card.Description
                      title={film.nameEn || film.nameRu}
                      subtitle={film.nameEn && film.nameRu}
                    >
                      <Card.ShortInfo
                        title="Genres: "
                        text={film.genres.map((item) => item.genre).join(", ")}
                      />
                      <Card.ShortInfo
                        title="Countries: "
                        text={film.countries.map((item) => item.country).join(", ")}
                      />
                      <Card.ShortInfo title="Rating: " text={film.rating} />
                    </Card.Description>
                  </Link>
                  <Card.FavoriteBadge />
                  <Card.ScoreBadge id={film.filmId} />
                </Card>
              );
            })}
        </ul>
        <div ref={ref} className={s.observableBlock}></div>
      </section>
    </div>
  );
};
