import { useParams } from "react-router-dom";
import s from "./MoviesAll.module.scss";
import { useGetAllMoviesQuery } from "../../../../store/movies/movies.api";
import { useEffect, useState } from "react";
import { IAllMovies, IAllMoviesQuery } from "../../../../models";
import { Card, Poster } from "../../../../components";
import { Link } from "react-router-dom";

export const MoviesAll = () => {
  const [movies, setMovies] = useState<IAllMovies[]>([]);
  const [params, setParams] = useState<IAllMoviesQuery>({
    page: 1,
  });

  const { id } = useParams();

  /* const { data: filters } = useGetMoviesFiltersQuery(); */

  const { isError, isLoading, data } = useGetAllMoviesQuery(params);

  useEffect(() => {
    if (data && params.page !== 1 && params.page < data?.total) {
      data?.items && setMovies((prev) => [...prev, ...data?.items!]);
    } else {
      data?.items && setMovies([...data?.items]);
    }
  }, [data]);
  return (
    <div className={s.container}>
      <h1 className={s.title}>All movies</h1>
      <section className={s.movies}>
        <ul className={s.movies__list}>
          {movies &&
            movies.map((item, index) => {
              return (
                <Card style={{ alignItems: "start" }} key={index}>
                  <Link to={`/movie/${item.kinopoiskId}`}>
                    <Poster
                      url={item.posterUrl}
                      alt={item.nameEn || item.nameRu}
                      style={{ height: "105px" }}
                    />
                  </Link>
                  <Link to={`/movie/${item.kinopoiskId}`}>
                    <Card.Description
                      title={item.nameEn || item.nameOriginal || item.nameRu}
                      subtitle={(item.nameEn || item.nameOriginal) && item.nameRu}
                    >
                      <Card.ShortInfo
                        title="Genres: "
                        text={item.genres.map((item) => item.genre).join(", ")}
                      />
                      <Card.ShortInfo
                        title="Countries: "
                        text={item.countries.map((item) => item.country).join(", ")}
                      />
                      <Card.ShortInfo title="Rating: " text={item.ratingKinopoisk} />
                    </Card.Description>
                  </Link>
                  <Card.FavoriteBadge/>
                  <Card.ScoreBadge id={item.kinopoiskId!} />
                </Card>
              );
            })}
        </ul>
      </section>
    </div>
  );
};
