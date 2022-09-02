import s from "./SearchTooltipDefault.module.scss";
import { useGetTopMoviesQuery } from "../../store/movies/movies.api";
import { IMovieShortInfo } from "../../models";
import { Link } from "react-router-dom";
import { MovieCard } from "../movieCard/MovieCard";

export const SearchTooltipDefault = () => {
  const { isError, isLoading, data } = useGetTopMoviesQuery({ type: "TOP_100_POPULAR_FILMS", page: 1 });

  return (
    <div className={s.container}>
      <h6 className={s.title}>Top popular movies</h6>
      <div className={s.list}>
        {data &&
          data.films?.map((movie: IMovieShortInfo, index) => {
            return (
              <Link to={`/movie/${movie?.filmId}`} key={index}>
                <MovieCard poster={movie.posterUrl} alt={movie.nameEn || movie.nameRu}>
                  <MovieCard.Description title={movie.nameEn || movie.nameRu}>
                    <MovieCard.Details rating={movie.rating} genres={movie.genres} year={movie.year} />
                  </MovieCard.Description>
                </MovieCard>
              </Link>
            );
          })}
      </div>
    </div>
  );
};
{
  /* <TooltipItem key={index} movie={movie} />; */
}
