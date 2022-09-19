import s from "./DigitalReleases.module.scss";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "../../assets";
import { Card, Preloader, Poster, Rating } from "../../components";
import { useGetDigitalReleasesQuery } from "../../store/movies/movies.api";
import { FC, useState } from "react";
import { Selector } from "../../components/UI";
import { years, months } from "../../helpers/vars";
import { IRelease, IMoviesResponse } from "../../store/movies/types";
import { useScrollMovies } from "../../hooks";

export const DigitalReleases: FC = () => {
  const [params, setParams] = useState({
    year: +new Date().toLocaleString("en-US", { year: "numeric" }),
    month: new Date().toLocaleString("en-US", { month: "long" }),
    page: 1,
  });

  const { isError, isLoading, data } = useGetDigitalReleasesQuery(params);

  const { ref, movies } = useScrollMovies<IMoviesResponse<IRelease>, typeof params, IRelease>(
    data!,
    params.page,
    data?.pages!,
    setParams
  );

  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <Link to="/" className={s.navigation__link}>
          Home page
        </Link>
        <IoIosArrowForward />
        <span>Digital releases</span>
      </div>
      <div className={s.content}>
        <h1 className={s.title}>Digital releases</h1>
        <div className={s.selectors}>
          <Selector
            data={years}
            setSelectedData={(e) => setParams({ ...params, year: e.target.textContent, page: 1 })}
            selectedData={params.year}
          />
          <Selector
            data={months}
            setSelectedData={(e) => setParams({ ...params, month: e.target.textContent, page: 1 })}
            selectedData={params.month}
          />
        </div>
        {data?.items && (
          <div className={s.list}>
            {movies.map((release) => {
              return (
                <Link to={`/movie/${release.id}`} key={release.id}>
                  <Card>
                    <Poster url={release.poster} alt={release.nameEn || release.nameRu} />
                    <Card.Description
                      title={release.nameEn || release.nameRu}
                      subtitle={release.nameEn && release.nameRu}
                    />
                    <Rating.Total
                      rating={release?.rating!}
                      votes={release?.ratingVoteCount!}
                      styleRating={{ fontSize: "14px" }}
                      styleVotes={{ fontSize: "12px" }}
                    />
                    <Card.ReleaseDate date={release.date} />
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
        <div className={s.observableBlock} ref={ref}></div>
      </div>
    </div>
  );
};
