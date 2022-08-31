import { FC, useState, useEffect } from "react";
import { RiCoinsLine } from "react-icons/ri";
import { useGetMovieByKeyQuery, useGetPersonByKeyQuery } from "../../store/movies/movies.api";
import { TooltipItem } from "../tooltipItem/TooltipItem";
import s from "./SearchTooltip.module.scss";


interface ISearchTooltipProps {
  keyword: string;
}

export const SearchTooltip: FC<ISearchTooltipProps> = ({ keyword }) => {
  const [query, setQuery] = useState({ key: keyword, page: 1 });
  const { isError: IsErrorMovies, isLoading: IsLoadingMovies, data: movies } = useGetMovieByKeyQuery(query);
  const { isError: isErrorPersons, isLoading: isLoadingPersons, data: persons } = useGetPersonByKeyQuery(query);
  console.log(persons)
  useEffect(() => {
    setQuery({ page: 1, key: keyword });
  }, [keyword]);

  return (
    <div className={s.container}>
      <h6 className={s.title}>Movies and TV series</h6>
      <div className={s.list}>
        {movies && movies.films.map((movie, index) => <TooltipItem key={index} movie={movie} />)}
      </div>
      <h6 className={s.title}>Persons</h6>
      <div className={s.list}>
        {
          persons?.items.map((person) => <TooltipItem key={person.kinopoiskId} person={person} />)
        }
      </div>
    </div>
  );
};
