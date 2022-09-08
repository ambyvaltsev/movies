import s from "./TopAwaitMovies.module.scss";
import { FC } from "react";
import { Slider, Poster } from "../../../../components";
import { useGetTopMoviesQuery } from "../../../../store/movies/movies.api";
import { Link } from "react-router-dom";
import { useMatchMedia } from "../../../../hooks";

interface ITopAwaitMoviesProps {
  title: string;
}

export const TopAwaitMovies: FC<ITopAwaitMoviesProps> = ({ title }) => {
  const { isTablet } = useMatchMedia();
  const { isError, isLoading, data } = useGetTopMoviesQuery(
    { type: "TOP_AWAIT_FILMS", page: 1 },
  );
  return (
    <section className={s.container}>
      <h3 className={s.title}>{title}</h3>
      {data && (
        <Slider length={data?.films.length}>
          {data?.films.map((film, index) => {
            return (
              <Link to={`movie/${film.filmId}`} key={index}>
                <Poster url={film.posterUrlPreview} alt={film.nameEn || film.nameRu} />
              </Link>
            );
          })}
        </Slider>
      )}
    </section>
  );
};
