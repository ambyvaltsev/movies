import s from "./DigitalReleases.module.scss";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "../../assets";
import { MovieCard, Preloader } from "../../components";
import { useGetDigitalReleasesQuery } from "../../store/movies/movies.api";
import { FC, useEffect, useState } from "react";
import { ReleasesDateSelector } from "../../components";
import { years, months } from "../../helpers/vars";
import { IRelease } from "../../models";
import { useInView } from "react-intersection-observer";

export const DigitalReleases: FC = () => {
  const { ref, inView, entry } = useInView();
  const [digitalReleases, setDigitalReleases] = useState<IRelease[]>([]);

  const [queryArg, setQueryArg] = useState({
    year: +new Date().toLocaleString("en-US", { year: "numeric" }),
    month: new Date().toLocaleString("en-US", { month: "long" }),
    page: 1,
  });
  const { isError, isLoading, data } = useGetDigitalReleasesQuery(queryArg);

  useEffect(() => {
    if (data && entry?.isIntersecting && queryArg.page < data?.pages) {
      setQueryArg((queryArg) => ({ ...queryArg, page: queryArg.page + 1 }));
    }
  }, [inView]);

  useEffect(() => {
    if (data && queryArg.page !== 1 && queryArg.page < data?.total) {
      data && setDigitalReleases((prev) => [...prev, ...data?.releases]);
    } else {
      data && setDigitalReleases([...data?.releases]);
    }
  }, [data]);

  if (isError) {
    return <div>Error</div>;
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
          <ReleasesDateSelector
            data={years}
            setSelectedDate={(e) => setQueryArg({ ...queryArg, year: e.target.textContent, page: 1 })}
            selectedDate={queryArg.year}
          />
          <ReleasesDateSelector
            data={months}
            setSelectedDate={(e) => setQueryArg({ ...queryArg, month: e.target.textContent, page: 1 })}
            selectedDate={queryArg.month}
          />
        </div>
        {isLoading && <Preloader />}
        {data?.releases && (
          <div className={s.list}>
            {digitalReleases.map((release, index) => {
              if (index < data.total) {
                return (
                  <Link to={`/movie/${release.id}`} key={release.id}>
                    <MovieCard poster={release.poster} alt={release.nameEn || release.nameRu}>
                      <MovieCard.Description
                        title={release.nameEn || release.nameRu}
                        subtitle={release.nameEn && release.nameRu}
                      />

                      <MovieCard.Rating rating={release?.rating!} votes={release?.ratingVoteCount!} />

                      <MovieCard.ReleaseDate date={release.date} />
                    </MovieCard>
                  </Link>
                );
              }
            })}
          </div>
        )}
        <div className={s.observableBlock} ref={ref}></div>
      </div>
    </div>
  );
};
