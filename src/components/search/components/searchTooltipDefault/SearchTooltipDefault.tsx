import s from "./SearchTooltipDefault.module.scss";
import { useGetTopMoviesQuery } from "../../../../store/movies/movies.api";
import { IMovieShortInfo } from "../../../../store/movies/types";
import { Link } from "react-router-dom";
import { Card, Poster } from "../../..";

export const SearchTooltipDefault = () => {
  const { isError, isLoading, data } = useGetTopMoviesQuery({ type: "TOP_100_POPULAR_FILMS", page: 1 });

  return (
    <div className={s.container}>
      <h6 className={s.title}>Top popular movies</h6>
      <div className={s.list}>
        {data &&
          data.items?.map((movie: IMovieShortInfo, index) => {
            return (
              <Link to={`/movie/${movie?.filmId}`} key={index}>
                <Card>
                  <Poster url={movie.posterUrl} alt={movie.nameEn || movie.nameRu} />
                  <Card.Description title={movie.nameEn || movie.nameRu}>
                    <Card.ShortMovieInfo rating={movie.rating} genres={movie.genres} year={movie.year} />
                  </Card.Description>
                </Card>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
