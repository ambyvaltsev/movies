import { useParams } from "react-router-dom";
import s from "./MoviesAll.module.scss";
import { allCategories } from "../../../../helpers";
import { useGetAllMoviesQuery, useGetTopMoviesQuery } from "../../../../store/movies/movies.api";
import { useEffect, useState } from "react";
import { IAllMoviesQuery } from "../../../../models";
import { Card } from "../../../../components";

export const MoviesAll = () => {
  const [params, setParams] = useState<IAllMoviesQuery>({
    page: 1,
  });

  const { id } = useParams();

  /* const { data: filters } = useGetMoviesFiltersQuery(); */

  const { isError, isLoading, data: movies } = useGetAllMoviesQuery(params);

  return (
    <div className={s.container}>
      <h1 className={s.title}>All movies</h1>
      <section className={s.movies}>
        <ul className={s.movies__list}>
          {movies &&
            movies.items.map((item, index) => {
              return (
                <Card poster={item.posterUrl} alt={item.nameEn || item.nameRu} key={index}>
                  <Card.Description
                    title={item.nameEn || item.nameRu}
                    subtitle={item.nameEn && item.nameRu}
                  ></Card.Description>
                </Card>
              );
            })}
        </ul>
      </section>
    </div>
  );
};
