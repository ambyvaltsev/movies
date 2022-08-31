import s from "./ReleasesBlock.module.scss";
import { useGetPremiereQuery, useGetDigitalReleasesQuery } from "../../../../store/movies/movies.api";
import { Preloader, ReleasesList } from "../../../../components";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "../../../../assets";

export const ReleasesBlock = () => {
  const {
    isError: isPremiereError,
    isLoading: isPremiereLoading,
    premiere,
  } = useGetPremiereQuery(
    {
      year: +new Date().toLocaleString("en-US", { year: "numeric" }),
      month: new Date().toLocaleString("en-US", { month: "long" }),
    },
    {
      selectFromResult: ({ data }) => ({
        premiere: data?.releases.filter((release) => new Date(release.date) > new Date()),
      }),
    }
  );
  const {
    isError: isDigitalError,
    isLoading: isDigitalLoading,
    data: digitalData,
  } = useGetDigitalReleasesQuery({
    year: +new Date().toLocaleString("en-US", { year: "numeric" }),
    month: new Date().toLocaleString("en-US", { month: "long" }),
  });

  if (isPremiereLoading || isDigitalLoading) {
    return <Preloader />;
  }
  if (isPremiereError || isDigitalError) {
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
          <ReleasesList data={premiere} />
        </div>
        <div className={s.releases__release}>
          <Link to="digital" className={s.release__link}>
            <h6 className={s.release__title}>Digital releases</h6>
            <IoIosArrowForward className={s.release__icon} />
          </Link>
          <ReleasesList data={digitalData.releases} />
        </div>
      </div>
    </div>
  );
};
