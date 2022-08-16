import s from "./Releases.module.scss";
import { useGetReleasesQuery, useGetDigitalReleasesQuery } from "../../../../queries/movies.api";
import { ReleaseList } from "../releaseList/ReleaseList";

export const Releases = () => {
  const date = new Date().toLocaleString("en-US", { year: "numeric", month: "long" }).split(" ");
  const {
    isError: isReleasesError,
    isLoading: isReleasesLoading,
    data: releasesData,
  } = useGetReleasesQuery({ year: +date[1], month: date[0] });
  const {
    isError: isDigReleasesError,
    isLoading: isDigReleasesLoading,
    data: digitalReleasesData,
  } = useGetDigitalReleasesQuery({ year: +date[1], month: date[0] });
  
  const releases = releasesData?.reduce((acc, cur) => {
    return [
      ...acc,
      {
        id: cur.kinopoiskId,
        nameRu: cur.nameRu,
        nameEn: cur.nameEn,
        date: cur.premiereRu,
        poster: cur.posterUrlPreview,
      },
    ];
  }, []);
  const digitalReleases = digitalReleasesData?.reduce((acc, cur) => {
    return [
      ...acc,
      {
        id: cur.filmId,
        nameRu: cur.nameRu,
        nameEn: cur.nameEn,
        date: cur.releaseDate,
        poster: cur.posterUrlPreview,
      },
    ];
  }, []);
  console.log(digitalReleases);
  if (isReleasesLoading) {
    return <div>Loading</div>;
  }
  if (isReleasesError) {
    return <div>Error</div>;
  }
  return (
    <div className={s.container}>
      <h3 className={s.title}>Release calendar</h3>
      <div className={s.releases}>
        <ReleaseList title="Coming soon to cinema" listData={releases} />
        <ReleaseList title="Digital releases" listData={digitalReleases} />
      </div>
    </div>
  );
};
