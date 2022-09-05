import s from "./DigitalReleases.module.scss";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "../../assets";
import { Card, Preloader } from "../../components";
import { useGetDigitalReleasesQuery } from "../../store/movies/movies.api";
import { FC, useEffect, useState } from "react";
import { Selector } from "../../components/UI";
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
      data?.releases && setDigitalReleases((prev) => [...prev, ...data?.releases!]);
    } else {
      data?.releases && setDigitalReleases([...data?.releases]);
    }
  }, [data]);

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
            setSelectedData={(e) => setQueryArg({ ...queryArg, year: e.target.textContent, page: 1 })}
            selectedData={queryArg.year}
          />
          <Selector
            data={months}
            setSelectedData={(e) => setQueryArg({ ...queryArg, month: e.target.textContent, page: 1 })}
            selectedData={queryArg.month}
          />
        </div>
        {isLoading && <Preloader />}
        {data?.releases && (
          <div className={s.list}>
            {digitalReleases.map((release, index) => {
              if (index < data.total) {
                return (
                  <Link to={`/movie/${release.id}`} key={release.id}>
                    <Card poster={release.poster} alt={release.nameEn || release.nameRu}>
                      <Card.Description
                        title={release.nameEn || release.nameRu}
                        subtitle={release.nameEn && release.nameRu}
                      />
                      <Card.Rating rating={release?.rating!} votes={release?.ratingVoteCount!} />
                      <Card.ReleaseDate date={release.date} />
                    </Card>
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
