import s from "./SearchTooltipDefault.module.scss";
import { TooltipItem } from "../tooltipItem/TooltipItem";
import { useGetTopMoviesQuery } from "../../store/movies/movies.api";
import { IMovieShortInfo } from "../../models";

export const SearchTooltipDefault = () => {
  const { isError, isLoading, data } = useGetTopMoviesQuery({ type: "TOP_100_POPULAR_FILMS", page: 1 });

  return (
    <div className={s.container}>
      <h6 className={s.title}>Top popular movies</h6>
      <div className={s.list}>
        {data &&
          data.films?.map((movie: IMovieShortInfo, index) => {
            return <TooltipItem key={index} movie={movie} />;
          })}
      </div>
    </div>
  );
};
