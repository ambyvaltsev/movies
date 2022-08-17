import s from "./ReleasesBlock.module.scss";
import { useGetReleasesQuery, useGetDigitalReleasesQuery } from "../../../../store/movies/movies.api";
import { MoviesList } from "../../../../components/moviesList/MoviesList";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "../../../../assets";

export const ReleasesBlock = () => {
  const {
    isError: isReleasesError,
    isLoading: isReleasesLoading,
    data: releasesData,
  } = useGetReleasesQuery({
    year: +new Date().toLocaleString("en-US", { year: "numeric" }),
    month: new Date().toLocaleString("en-US", { month: "long" }),
  });

  const {
    isError: isDigReleasesError,
    isLoading: isDigReleasesLoading,
    data: digitalReleasesData,
  } = useGetDigitalReleasesQuery({
    year: +new Date().toLocaleString("en-US", { year: "numeric" }),
    month: new Date().toLocaleString("en-US", { month: "long" }),
  });


  if (isReleasesLoading || isDigReleasesLoading) {
    return <div>Loading</div>;
  }
  if (isReleasesError || isDigReleasesError) {
    return <div>Error</div>;
  }
  return (
    <div className={s.container}>
      <h3 className={s.title}>Release calendar</h3>
      <div className={s.releases}>
        <div className={s.releases__release}>
          <Link to="premiere" className={s.release__link}>
            <h6 className={s.release__title}>Coming soon to cinema</h6>
            <IoIosArrowForward className={s.release__icon} />
          </Link>
          <MoviesList listData={releasesData} />
        </div>
        <div className={s.releases__release}>
          <Link to="digital-releases" className={s.release__link}>
            <h6 className={s.release__title}>Digital releases</h6>
            <IoIosArrowForward className={s.release__icon} />
          </Link>
          <MoviesList listData={digitalReleasesData} />
        </div>
      </div>
    </div>
  );
};
