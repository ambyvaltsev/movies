import { FC, useState, useEffect } from "react";
import { useGetMovieByKeyQuery } from "../../store/movies/movies.api";
import { useGetPersonByKeyQuery } from "../../store/movies/staff.api";
import s from "./SearchTooltip.module.scss";
import { Link } from "react-router-dom";
import { MovieCard } from "../../components";

interface ISearchTooltipProps {
  keyword: string;
}

export const SearchTooltip: FC<ISearchTooltipProps> = ({ keyword }) => {
  const [query, setQuery] = useState({ key: keyword, page: 1 });
  const { isError: IsErrorMovies, isLoading: IsLoadingMovies, data: movies } = useGetMovieByKeyQuery(query);
  const {
    isError: isErrorPersons,
    isLoading: isLoadingPersons,
    data: persons,
  } = useGetPersonByKeyQuery(query);
  useEffect(() => {
    setQuery({ page: 1, key: keyword });
  }, [keyword]);

  return (
    <div className={s.container}>
      <h6 className={s.title}>Movies and TV series</h6>
      <div className={s.list}>
        {movies &&
          movies.films.map((movie, index) => {
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
      <h6 className={s.title}>Persons</h6>
      <div className={s.list}>
        {persons?.items.map((person, index) => {
          return (
            <Link to={`/staff/${person.kinopoiskId}`} key={index}>
              <MovieCard poster={person.posterUrl} alt={person.nameEn || person.nameRu}>
                <MovieCard.Description title={person.nameEn && person.nameRu} />
              </MovieCard>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
