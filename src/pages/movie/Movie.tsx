import { useParams } from "react-router-dom";
import { useGetMovieQuery, useGetStaffQuery } from "../../store/movies/movies.api";
import { MovieDescriptionSub, MovieInfoItem } from "./components";
import { IoIosArrowForward } from "../../assets";
import s from "./Movie.module.scss";
import { IStaffUnit } from "../../models";

const flatDataStaff = (arr: IStaffUnit[]) => {
  return arr.reduce((acc: string[], cur) => {
    return [...acc, cur.nameEn || cur.nameRu];
  }, []);
};

export const Movie = () => {
  const { id } = useParams();
  const { isError: isErrorMovie, isLoading: isloadingMovie, data: movie } = useGetMovieQuery(id!);
  const { isError: isErrorStaff, isLoading: isLoadingStaff, data: staff } = useGetStaffQuery(id!);

  const filmLength = `${movie?.filmLength} min / ${movie && Math.trunc(movie?.filmLength / 60)}:${
    movie && movie?.filmLength % 60
  }`;
  if (isErrorMovie || isErrorStaff) {
    return <div>Error</div>
  }
  return (
    <div className={s.container}>
      <div className={s.description__main}>
        <div className={s.main__poster}>
          <img src={movie?.posterUrl} alt={movie?.nameOriginal || movie?.nameRu} />
        </div>
        <div className={s.main__content}>
          <header className={s.main__header}>
            <h1 className={s.header__title}>{movie?.nameOriginal}</h1>
          </header>
          <div className={s.main__body}>
            <h3 className={s.body__title}>About the series</h3>
            <div className={s.body__about}>
              <div className={s.about__info}>
                {movie && staff && (
                  <>
                    <MovieInfoItem title="Production year" info={movie?.year} />
                    <MovieInfoItem title="Country" info={movie?.countries} />
                    <MovieInfoItem title="Genre" info={movie?.genres} />
                    <MovieInfoItem title="Slogan" info={movie.slogan} />
                    <MovieInfoItem title="Director" info={flatDataStaff(staff.director)} />
                    <MovieInfoItem title="Writer" info={flatDataStaff(staff.writer)} />
                    <MovieInfoItem title="Producer" info={flatDataStaff(staff.producer)} />
                    <MovieInfoItem title="Composer" info={flatDataStaff(staff.composer)} />
                    <MovieInfoItem title="Designer" info={flatDataStaff(staff.design)} />
                    <MovieInfoItem title="Editor" info={flatDataStaff(staff.editor)} />
                    <MovieInfoItem title="Movie length" info={filmLength} />
                  </>
                )}
              </div>
              <div className={s.about__starring}>
                <div className={s.starring__header}>
                  <h6 className={s.starring__title}>Starring</h6>
                  <span className={s.starring__icon}>
                    <IoIosArrowForward />
                  </span>
                </div>
                <div className={s.starring__body}>
                  {staff?.actors.map((a, i) => (i < 10 ? <span key={i}>{a.nameEn || a.nameRu}</span> : null))}
                  <div className={s.starring__all}>{`${staff?.actors?.length} actors`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {movie && <MovieDescriptionSub description={movie?.description} id={movie?.kinopoiskId} />}
    </div>
  );
};
