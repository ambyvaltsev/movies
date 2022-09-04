import { useParams } from "react-router-dom";
import { useGetMovieQuery } from "../../store/movies/movies.api";
import { useGetStaffQuery } from "../../store/movies/staff.api";
import { MovieDetails } from "./components";
import s from "./Movie.module.scss";
import { MovieInfoCard, Preloader, Info, Poster } from "../../components";
import { useState } from "react";

export const Movie = () => {
  const [info, setInfo] = useState<{ id: string; x: number; y: number }>({ id: "", x: 0, y: 0 });
  const { id } = useParams();
  const { isError: isErrorMovie, isLoading: isLoadingMovie, data: movie } = useGetMovieQuery(id!);
  const { isError: isErrorStaff, isLoading: isLoadingStaff, data: staff } = useGetStaffQuery(id!);

  const items = [
    { title: "Production year", movie: movie?.year, type: "movie", isClickable: false },
    { title: "Country", movie: movie?.countries, type: "movie", isClickable: true },
    { title: "Genre", movie: movie?.genres, type: "movie", isClickable: true },
    { title: "Slogan", movie: movie?.slogan, type: "movie", isClickable: false },
    { title: "Director", staff: staff?.director, type: "staff", isClickable: true },
    { title: "Writer", staff: staff?.writer, type: "staff", isClickable: true },
    { title: "Producer", staff: staff?.producer, type: "staff", isClickable: true },
    { title: "Composer", staff: staff?.composer, type: "staff", isClickable: true },
    { title: "Designer", staff: staff?.design, type: "staff", isClickable: true },
    { title: "Editor", staff: staff?.editor, type: "staff", isClickable: true },
    {
      title: "Movie length",
      movie: `${movie?.filmLength} min / ${movie && Math.trunc(movie?.filmLength / 60)}:${
        movie && movie?.filmLength % 60
      }`,
      type: "movie",
      isClickable: false,
    },
  ];
  const openCard = (e: any) => {
    if (e.target.dataset.card) {
      const left =
        e.clientX + 280 > document.documentElement.clientWidth
          ? document.documentElement.clientWidth - 280
          : e.pageX;
      const top = e.clientY + 150 > document.documentElement.clientHeight ? e.pageY - 150 : e.pageY;
      setInfo({ id: e.target.dataset.card, x: left, y: top - 70 });
    }
  };

  const closeCard = (e: any) => {
    if (e.target.dataset.card) {
      setInfo({ ...info, id: "" });
    }
  };
  console.log("svec");
  const aboutTitle = movie?.type.split("_")[1]?.toLowerCase() || movie?.type.toLowerCase();

  if (isErrorMovie || isErrorStaff) {
    return <div>Error</div>;
  }
  if (isLoadingMovie || isLoadingStaff) {
    return <Preloader />;
  }
  return (
    <Info>
      {movie && staff && (
        <>
          <div className={s.content}>
            <Poster url={movie?.posterUrl} alt={movie?.nameOriginal || movie?.nameRu} />
            <Info.Description
              title={movie?.nameEn || movie?.nameOriginal || movie.nameRu}
              subtitle={(movie?.nameEn || movie?.nameOriginal) && movie.nameRu}
            >
              <Info.About
                title={`About the ${aboutTitle}`}
                items={items}
                openCard={openCard}
                closeCard={closeCard}
              >
                <Info.RelatedContent title="Starring">
                  <Info.RelatedList items={staff?.actors} link="staff" />
                  <div className={s.all}>{`${staff?.actors?.length} actors`}</div>
                </Info.RelatedContent>
              </Info.About>
            </Info.Description>
          </div>
          <MovieDetails description={movie?.description} id={movie?.kinopoiskId} />
          {info.id && <MovieInfoCard info={info} />}
        </>
      )}
    </Info>
  );
};
