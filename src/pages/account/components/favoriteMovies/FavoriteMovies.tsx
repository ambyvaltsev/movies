import s from "./FavoriteMovies.module.scss";
import { fetchFavoriteMovies } from "../../../../store/movies/movies.api";
import { UserMovies } from "../userMovies/UserMovies";
import { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch } from "../../../../hooks";
import { useInView } from "react-intersection-observer";
import { IMyRatedMovie } from "../../../../store/movies/types";

export const FavoriteMovies = () => {
  const [length, setLength] = useState({ start: 0, end: 1 });
  const { ref, inView, entry } = useInView();
  const dispatch = useAppDispatch();
  const [movies, setMovies] = useState<IMyRatedMovie[]>([]);


  useEffect(() => {
    dispatch(fetchFavoriteMovies(length))
      .unwrap()
      .then((res) => {
        if (movies.length === 0) {
          setMovies(res);
        } else {
          setMovies((prev) => [...prev, ...res]);
        }
      });
  }, [length]);

  useLayoutEffect(() => {
    if (length.end < movies.length) {
      setLength((prev) => ({ start: prev.end + 1, end: prev.end + 3 }));
    }
  }, [inView, entry?.isIntersecting]);

  return (
    <div className={s.container}>
      <UserMovies movies={movies} title='Favorite movies' ref={ref} />
    </div>
  );
};
