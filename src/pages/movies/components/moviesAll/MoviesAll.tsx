import { useNavigate, useLocation, Link } from "react-router-dom";
import s from "./MoviesAll.module.scss";
import { useGetAllMoviesQuery } from "../../../../store/movies/movies.api";
import { useState, useEffect } from "react";
import { IAllMovies, IAllMoviesQuery, IMoviesResponse } from "../../../../store/movies/types";
import { Card, Poster, Sorting, FilterDesktop, FilterMobile, Error, Preloader } from "../../../../components";
import { useScrollMovies } from "../../../../hooks/useScrollMovies";
import { getUrl, getParams, order } from "../../../../helpers";
import { IoIosOptions } from "../../../../assets";

export interface ISelected {
  [k: string]: { value: string; id?: string | number };
}

export const MoviesAll = () => {
  const navigator = useNavigate();
  const { search } = useLocation();
  const [openMenu, setOpenMenu] = useState(false);
  const [params, setParams] = useState<IAllMoviesQuery>({
    page: 1,
  });

  const [selected, setSelected] = useState({} as ISelected);
  const { isError, isLoading, data } = useGetAllMoviesQuery(params);
  const { ref, movies } = useScrollMovies<IMoviesResponse<IAllMovies>, IAllMoviesQuery, IAllMovies>(
    data!,
    params.page,
    data?.pages!,
    setParams
  );
  useEffect(() => {
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

  const handleMobileFilter = () => {
    setOpenMenu(!openMenu);
  };

  if (isError) {
    return <Error/>
  }
  if (isLoading) {
    return <Preloader/>
  }

  return (
    <div className={s.container}>
      <div className={s.content}>
        <FilterDesktop setSelected={setSelected} selected={selected} />
        <FilterMobile
          setSelected={setSelected}
          selected={selected}
          isOpen={openMenu}
          setIsOpen={handleMobileFilter}
        />
        <section className={s.movies}>
          <h1 className={s.title}>All movies</h1>
          <div className={s.options}>
            <IoIosOptions className={s.options__filter} onClick={handleMobileFilter} />
            <Sorting items={order} setSelected={setSelected} selected={selected} />
          </div>
          <ul className={s.movies__list}>
            {movies &&
              movies.map((item, index) => {
                return (
                  <div key={index}>
                    <div ref={index === movies.length - 1 ? ref : null}></div>
                    <Card style={{ alignItems: "start" }} >
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
                      <div className={s.card__badges}>
                        <Card.RatingBadge id={item.kinopoiskId!} />
                        <Card.FavoriteBadge id={item.kinopoiskId} />
                      </div>
                    </Card>
                  </div>
                );
              })}
          </ul>
        </section>
      </div>
    </div>
  );
};
