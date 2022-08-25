import { useParams } from "react-router-dom";
import { useGetMovieQuery, useGetStaffQuery } from "../../store/movies/movies.api";
import { MovieDescriptionSub, MovieInfoItem, StaffCard } from "./components";
import { IoIosArrowForward } from "../../assets";
import s from "./Movie.module.scss";
import { useEffect, useRef, useState } from "react";

export const Movie = () => {
  const [staffInfo, setStaffInfo] = useState<{ id: string; x: number; y: number }>({ id: "", x: 0, y: 0 });
  const bodyRef = useRef<HTMLDivElement>(null);
  const { id } = useParams();
  const { isError: isErrorMovie, isLoading: isloadingMovie, data: movie } = useGetMovieQuery(id!);
  const { isError: isErrorStaff, isLoading: isLoadingStaff, data: staff } = useGetStaffQuery(id!);

  const filmLength = `${movie?.filmLength} min / ${movie && Math.trunc(movie?.filmLength / 60)}:${
    movie && movie?.filmLength % 60
  }`;

  const openCard = (e: any) => {
    if (e.target.dataset.card) {
      const left =
        e.pageX + 260 > document.documentElement.clientWidth
          ? document.documentElement.clientWidth - 260
          : e.pageX;

      setStaffInfo({ id: e.target.dataset.card, x: left, y: e.pageY - 70 });
    }
  };
  const closeCard = () => {
    setStaffInfo({ ...staffInfo, id: "" });
  };
  useEffect(() => {
    const instance = bodyRef.current;
    if (instance) {
      instance.addEventListener("mouseover", openCard);
      instance.addEventListener("mouseout", closeCard);
      return () => {
        instance.removeEventListener("mouseover", openCard);
        instance.removeEventListener("mouseover", closeCard);
      };
    }
  }, []);

  if (isErrorMovie || isErrorStaff) {
    return <div>Error</div>;
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
            <h3 className={s.body__title}>{`About the ${movie?.type.toLowerCase()}`}</h3>
            <div className={s.body__about} ref={bodyRef}>
              <div className={s.about__info}>
                {movie && staff && (
                  <>
                    <MovieInfoItem title="Production year" info={movie?.year} />
                    <MovieInfoItem title="Country" info={movie?.countries} isClickable />
                    <MovieInfoItem title="Genre" info={movie?.genres} isClickable />
                    <MovieInfoItem title="Slogan" info={movie.slogan} />
                    <MovieInfoItem title="Director" staff={staff.director} isClickable />
                    <MovieInfoItem title="Writer" staff={staff.writer} isClickable />
                    <MovieInfoItem title="Producer" staff={staff.producer} isClickable />
                    <MovieInfoItem title="Composer" staff={staff.composer} isClickable />
                    <MovieInfoItem title="Designer" staff={staff.design} isClickable />
                    <MovieInfoItem title="Editor" staff={staff.editor} isClickable />
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
                  {staff?.actors.map((a, i) =>
                    i < 10 ? (
                      <span key={i} className={s.starring__name}>
                        {a.nameEn || a.nameRu}
                      </span>
                    ) : null
                  )}
                  <div className={s.starring__all}>{`${staff?.actors?.length} actors`}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {movie && <MovieDescriptionSub description={movie?.description} id={movie?.kinopoiskId} />}
      {staffInfo.id && <StaffCard staffInfo={staffInfo} />}
    </div>
  );
};
