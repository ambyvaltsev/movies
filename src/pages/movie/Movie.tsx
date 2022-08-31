import { useParams } from "react-router-dom";
import { useGetMovieQuery, useGetStaffQuery } from "../../store/movies/movies.api";
import { MovieDetails } from "./components";
import s from "./Movie.module.scss";
import { useShowInfoCard } from "../../hooks";
import { RelatedInfoList, MovieInfoCard, InfoItem, Preloader } from "../../components";

export const Movie = () => {
  const { id } = useParams();
  const { isError: isErrorMovie, isLoading: isLoadingMovie, data: movie } = useGetMovieQuery(id!);
  const { isError: isErrorStaff, isLoading: isLoadingStaff, data: staff } = useGetStaffQuery(id!);
  const { info, ref } = useShowInfoCard(isLoadingMovie || isLoadingStaff);

  const filmLength = `${movie?.filmLength} min / ${movie && Math.trunc(movie?.filmLength / 60)}:${
    movie && movie?.filmLength % 60
  }`;

  if (isErrorMovie || isErrorStaff) {
    return <div>Error</div>;
  }
  if (isLoadingMovie || isLoadingStaff) {
    return <Preloader />;
  }
  return (
    <div className={s.container}>
      <div className={s.description__main}>
        <div className={s.main__poster}>
          <img src={movie?.posterUrl} alt={movie?.nameOriginal || movie?.nameRu} />
        </div>
        <div className={s.main__content}>
          <h1 className={s.main__title}>{movie?.nameOriginal}</h1>
          <div className={s.main__body}>
            <h2 className={s.body__title}>{`About the ${
              movie?.type.split("_")[1]?.toLowerCase() || movie?.type.toLowerCase()
            }`}</h2>
            <section className={s.body__about} ref={ref}>
              <div className={s.about__info}>
                {movie && staff && (
                  <>
                    <InfoItem title="Production year" info={movie?.year} />
                    <InfoItem title="Country" info={movie?.countries} isClickable />
                    <InfoItem title="Genre" info={movie?.genres} isClickable />
                    <InfoItem title="Slogan" info={movie.slogan} />
                    <InfoItem title="Director" staff={staff.director} isClickable />
                    <InfoItem title="Writer" staff={staff.writer} isClickable />
                    <InfoItem title="Producer" staff={staff.producer} isClickable />
                    <InfoItem title="Composer" staff={staff.composer} isClickable />
                    <InfoItem title="Designer" staff={staff.design} isClickable />
                    <InfoItem title="Editor" staff={staff.editor} isClickable />
                    <InfoItem title="Movie length" info={filmLength} />
                  </>
                )}
              </div>
              <div className={s.about__starring}>
                {staff && <RelatedInfoList actors={staff?.actors} title="Starring" />}
                <div className={s.starring__all}>{`${staff?.actors?.length} actors`}</div>
              </div>
            </section>
          </div>
        </div>
      </div>
      {movie && <MovieDetails description={movie?.description} id={movie?.kinopoiskId} />}
      {info.id && <MovieInfoCard info={info} />}
    </div>
  );
};
