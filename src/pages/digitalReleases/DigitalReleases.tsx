import s from "./DigitalReleases.module.scss";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "../../assets";
import { ReleasesList } from "../../components";
import { useGetDigitalReleasesQuery } from "../../store/movies/movies.api";
import { FC, useEffect, useState, useRef } from "react";
import { ReleasesDateSelector } from "../../components";
import { years, months } from "../../helpers/vars";
import { IRelease } from "../../models";
import { useInView } from "react-intersection-observer";

export const DigitalReleases: FC = () => {
  const prevQueryArg = useRef({ year: 0, month: "" });
  const { ref, inView, entry } = useInView();
  const [digitalReleases, setDigitalReleases] = useState<IRelease[]>([]);

  const [queryArg, setQueryArg] = useState({
    year: +new Date().toLocaleString("en-US", { year: "numeric" }),
    month: new Date().toLocaleString("en-US", { month: "long" }),
    page: 1,
  });
  const { isError, isLoading, data } = useGetDigitalReleasesQuery(queryArg);

  useEffect(() => {
    if (data && entry?.isIntersecting && !isLoading && queryArg.page < data?.pages) {
      setQueryArg((queryArg) => ({ ...queryArg, page: queryArg.page + 1 }));
    }
  }, [inView]);

  useEffect(() => {
    if (queryArg.year === prevQueryArg.current.year && queryArg.month === prevQueryArg.current.month) {
      data && setDigitalReleases([...digitalReleases, ...data?.releases]);
    } else {
      data && setDigitalReleases([...data?.releases]);
      prevQueryArg.current = { year: queryArg.year, month: queryArg.month };
    }
  }, [data]);

  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
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
        {data?.releases && <ReleasesList data={digitalReleases} limit={data.total} />}
        <div className={s.observableBlock} ref={ref}></div>
      </div>
    </div>
  );
};
