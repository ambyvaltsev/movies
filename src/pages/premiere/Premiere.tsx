import { Link } from "react-router-dom";
import s from "./Premiere.module.scss";
import { IoIosArrowForward } from "../../assets";
import { Preloader } from "../../components";
import { useGetPremiereQuery } from "../../store/movies/movies.api";
import { FC, useState, useEffect } from "react";
import { ReleasesDateSelector, MovieCard } from "../../components";
import { years, months } from "../../helpers/vars";
import { useInView } from "react-intersection-observer";

export const Premiere: FC = () => {
  const [limit, setLimit] = useState(10);
  const [selectedDate, setSelectedDate] = useState({
    year: +new Date().toLocaleString("en-US", { year: "numeric" }),
    month: new Date().toLocaleString("en-US", { month: "long" }),
  });

  const { isError, isLoading, data } = useGetPremiereQuery(selectedDate);
  const { ref, inView, entry } = useInView();

  useEffect(() => {
    if (data && limit < data?.total) {
      setLimit(limit + 5);
    }
  }, [inView]);

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
        <span>Movie premiere schedule</span>
      </div>
      <div className={s.content}>
        <h1 className={s.title}>Movie premiere schedule</h1>
        <div className={s.selectors}>
          <ReleasesDateSelector
            data={years}
            setSelectedDate={(e) => setSelectedDate({ ...selectedDate, year: e.target.textContent })}
            selectedDate={selectedDate.year}
          />
          <ReleasesDateSelector
            data={months}
            setSelectedDate={(e) => setSelectedDate({ ...selectedDate, month: e.target.textContent })}
            selectedDate={selectedDate.month}
          />
        </div>
        {data?.releases && (
          <div className={s.list}>
            {data.releases.map((release, index) => {
              if (index < limit) {
                return (
                  <Link to={`/movie/${release.id}`} key={release.id}>
                    <MovieCard poster={release.poster} alt={release.nameEn || release.nameRu}>
                      <MovieCard.Description
                        title={release.nameEn || release.nameRu}
                        subtitle={release.nameEn && release.nameRu}
                      />
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
