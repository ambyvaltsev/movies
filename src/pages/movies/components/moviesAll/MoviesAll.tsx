import { useParams, useNavigate, useLocation, Link } from "react-router-dom";
import s from "./MoviesAll.module.scss";
import { useGetAllMoviesQuery } from "../../../../store/movies/movies.api";
import { useState, useEffect } from "react";
import { IAllMovies, IAllMoviesQuery, IMoviesResponse } from "../../../../models";
import { Card, Poster, Sorting } from "../../../../components";
import { useScrollMovies } from "../../../../hooks/useScrollMovies";
import { Filter } from "../../components";
import { getUrl, getParams, order } from "../../../../helpers";

export interface ISelected {
  [k: string]: { value: string; id?: string | number };
}

export const MoviesAll = () => {
  const { id } = useParams();
  const navigator = useNavigate();
  const { search } = useLocation();

  const [params, setParams] = useState<IAllMoviesQuery>({
    page: 1,
  });

  const [selected, setSelected] = useState({} as ISelected);

  const { isError, isLoading, data } = useGetAllMoviesQuery(params);

  const { ref, movies } = useScrollMovies<IMoviesResponse<IAllMovies>, IAllMoviesQuery, IAllMovies>(
    data!,
    params.page,
    data?.totalPages!,
    setParams
  );

  useEffect(() => {
    console.log(selected);
    setParams({
      countries: selected?.country?.id,
      genres: selected?.genre?.id,
      order: selected?.order?.id,
      page: 1,
    });
    const url = getUrl(selected);
    url.length > 0 ? navigator(`?${url.join("&")}`) : navigator(``);
  }, [selected]);

  useEffect(() => {
    if (search.length > 1) {
      const params = getParams(search);
      setSelected(params);
    }
  }, []);

  return (
    <div className={s.container}>
      <h1 className={s.title}>All movies</h1>
      <div className={s.content}>
        {id === "movies" && <Filter setSelected={setSelected} selected={selected} />}
        <section className={s.movies}>
          {id === "movies" && <Sorting items={order} setSelected={setSelected} selected={selected} />}
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
                    <Card.FavoriteBadge />
                    <Card.ScoreBadge id={item.kinopoiskId!} />
                  </Card>
                );
              })}
          </ul>
          <div ref={ref} className={s.observableBlock}></div>
        </section>
      </div>
    </div>
  );
};
