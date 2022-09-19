import { FC, useState, useEffect } from "react";
import { useGetMovieByKeyQuery } from "../../../../store/movies/movies.api";
import { useGetPersonByKeyQuery } from "../../../../store/movies/staff.api";
import s from "./SearchTooltip.module.scss";
import { Link } from "react-router-dom";
import { Card, Poster } from "../../../../components";

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
      <h6 className={s.title}>Persons</h6>
      <div className={s.list}>
        {persons?.items.map((person, index) => {
          return (
            <Link to={`/staff/${person.kinopoiskId}`} key={index}>
              <Card>
                <Poster url={person.posterUrl} alt={person.nameEn || person.nameRu} />
                <Card.Description title={person.nameEn && person.nameRu} />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
