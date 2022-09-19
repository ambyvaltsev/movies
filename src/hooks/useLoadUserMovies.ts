import { useAppSelector } from "./redux";
import { useEffect } from "react";
import { useLazyGetRatedMoviesQuery } from "../store/user/user.api";
import { saveToStorage } from "../helpers";

export const useLoadUserMovies = () => {
  const { isAuth, id } = useAppSelector((state) => state.auth.entities);
  const [loadMovies ] = useLazyGetRatedMoviesQuery();

  useEffect(() => {
    if (isAuth) {
      loadMovies(id!)
        .unwrap()
        .then((res) => saveToStorage("ratedMovies", res));
    }
  }, [isAuth]);
};
