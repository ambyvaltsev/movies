import { useParams, useNavigate, useLocation } from "react-router-dom";
import s from "./MoviesAll.module.scss";
import { useGetAllMoviesQuery } from "../../../../store/movies/movies.api";
import { useEffect, useState } from "react";
import { IAllMovies, IAllMoviesQuery } from "../../../../models";
import { Card, Poster } from "../../../../components";
import { Link } from "react-router-dom";
import { Selector } from "../../../../components/UI";
import { countries, genres } from "../../../../helpers";
import { IoIosArrowDown, IoIosArrowUp } from "../../../../assets";

export const MoviesAll = () => {
  const navigator = useNavigate()
  console.log(useLocation())
  const [hideSelector, setHideSelector] = useState({ countries: false, genres: false });
  const [selectedGenre, setSelectedGenre] = useState({ value: "All genres", id: "" });
  const [selectedCountry, setSelectedCountry] = useState({ value: "All countries", id: "" });

  const [movies, setMovies] = useState<IAllMovies[]>([]);

  const [params, setParams] = useState<IAllMoviesQuery>({
    page: 1,
  });

  const { id } = useParams();

  const { isError, isLoading, data } = useGetAllMoviesQuery(params);

  useEffect(() => {
    setParams((prev) => ({ ...prev, countries: selectedCountry.id, genres: selectedGenre.id }));

    const country = selectedCountry.value !== 'All countries' ? `country=${selectedCountry.value}` : ''  
    navigator(`?${country}`)
  }, [selectedGenre, selectedCountry]);

  useEffect(() => {
    if (data && params.page !== 1 && params.page < data?.total) {
      data?.items && setMovies((prev) => [...prev, ...data?.items!]);
    } else {
      data?.items && setMovies([...data?.items]);
    }
  }, [data]);

  const hideCountriesSelector = () => {
    setHideSelector((prev) => ({ ...prev, countries: !prev.countries }));
  };
  const hideGenresSelector = () => {
    setHideSelector((prev) => ({ ...prev, genres: !prev.genres }));
  };
  return (
    <div className={s.container}>
      <h1 className={s.title}>All movies</h1>
      <div className={s.content}>
        {id === "movies" && (
          <aside className={s.filter}>
            <div className={s.filter__item}>
              <div className={s.item__title} onClick={hideCountriesSelector}>
                {hideSelector.countries ? <IoIosArrowDown /> : <IoIosArrowUp />}
                <span>Countries</span>
              </div>
              {!hideSelector.countries && (
                <Selector
                  data={countries}
                  selectedData={selectedCountry.value}
                  setSelectedData={(e) =>
                    setSelectedCountry({ value: e.target.textContent, id: e.target.dataset.id })
                  }
                  style={{ width: "130px" }}
                />
              )}
            </div>
            <div className={s.filter__item}>
              <div className={s.item__title} onClick={hideGenresSelector}>
                {hideSelector.genres ? <IoIosArrowDown /> : <IoIosArrowUp />}
                <span>Genres</span>
              </div>
              {!hideSelector.genres && (
                <Selector
                  data={genres}
                  selectedData={selectedGenre.value}
                  setSelectedData={(e) =>
                    setSelectedGenre({ value: e.target.textContent, id: e.target.dataset.id })
                  }
                  style={{ width: "130px" }}
                />
              )}
            </div>
          </aside>
        )}
        <section className={s.movies}>
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
        </section>
      </div>
    </div>
  );
};
