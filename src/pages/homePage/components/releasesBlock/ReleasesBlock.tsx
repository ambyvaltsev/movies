import s from "./ReleasesBlock.module.scss";
import { useGetPremiereQuery, useGetDigitalReleasesQuery } from "../../../../store/movies/movies.api";
import { Preloader, Card } from "../../../../components";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "../../../../assets";

export const ReleasesBlock = () => {
  const { premiere } = useGetPremiereQuery(
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

  if (isDigitalLoading) {
    return <Preloader />;
  }
  if (isDigitalError) {
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
          <div className={s.release__list}>
            {premiere && premiere.map((release, index) => {
              if (index < 5) {
                return (
                  <Card poster={release.poster} alt={release.nameEn || release.nameRu} key={release.id}>
                    <Card.Description
                      title={release.nameEn || release.nameRu}
                      subtitle={release.nameEn && release.nameRu}
                    />
                    <Card.ReleaseDate date={release.date} />
                  </Card>
                );
              }
            })}
          </div>
        </div>
        <div className={s.releases__release}>
          <Link to="digital" className={s.release__link}>
            <h6 className={s.release__title}>Digital releases</h6>
            <IoIosArrowForward className={s.release__icon} />
          </Link>
          <div className={s.release__list}>
            {digitalData && digitalData.releases.map((release, index) => {
              if (index < 5) {
                return (
                  <Card poster={release.poster} alt={release.nameEn || release.nameRu} key={release.id}>
                    <Card.Description
                      title={release.nameEn || release.nameRu}
                      subtitle={release.nameEn && release.nameRu}
                    />
                    <Card.Rating rating={release?.rating!} votes={release?.ratingVoteCount!} />
                    <Card.ReleaseDate date={release.date} />
                  </Card>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
