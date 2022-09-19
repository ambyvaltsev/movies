import s from "./Kinopoisk.module.scss";
import { Star, Rating } from "../../../../components";
import { useState } from "react";
import { useGetMovieQuery } from "../../../../store/movies/movies.api";
import { useParams } from "react-router-dom";
import { useAddRatedMovieMutation } from "../../../../store/user/user.api";
import { useAppSelector } from "../../../../hooks";
import { saveToStorage } from "../../../../helpers";


export const Kinopoisk = () => {
  const ratedMovies = useAppSelector((state) => state.user.ratedMovies);
  const { isAuth, id: userId } = useAppSelector((state) => state.auth.entities!);
  const [addRatedMovie] = useAddRatedMovieMutation();
  const [active, setActive] = useState(0);
  const [value, setValue] = useState(0);
  const { id: movieId } = useParams();

  const { kp } = useGetMovieQuery(movieId!, {
    selectFromResult: ({ data }) => ({
      kp: { rating: data?.ratingKinopoisk, votes: data?.ratingKinopoiskVoteCount },
    }),
  });

  const handleSelectedValue = (e: any) => {
    if (!isAuth) return;
    if (ratedMovies.some((item) => item.movieId === movieId)) {
      return;
    }
    addRatedMovie({
      id: userId!,
      movieId: movieId!,
      movies: [
        ...ratedMovies,
        {
          movieId: movieId!,
          rating: e.target.value,
          date: new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        },
      ],
    })
      .unwrap()
      .then((res) => {
        saveToStorage("ratedMovies", res);
      });
    setValue(e.target.value);
  };

  const movie = ratedMovies.find((film) => film.movieId === movieId)


  return (
    <div className={s.container}>
      <h4 className={s.title}>Kinopoisk</h4>
      <form className={s.form}>
        <div className={s.badges}>
          {movieId &&
            Array.from({ length: 10 }, (x, i) => i + 1).map((el, i) => {
              return (
                <Star
                  key={i}
                  radioNum={el}
                  value={value}
                  selectValue={handleSelectedValue}
                  rating={kp.rating}
                  active={active}
                  setActiveOver={() => setActive(el)}
                  setActiveOut={() => setActive(0)}
                  id={movieId!}
                />
              );
            })}
        </div>
        <Rating.Total rating={kp.rating} votes={kp.votes || ""} />
      </form>
      {movie && <Rating.MyRating movie={movie} />}
    </div>
  );
};
