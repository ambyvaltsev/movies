import { useAppSelector } from "./redux";
import { useEffect } from "react";
import { useLazyGetFavoriteMoviesQuery, useLazyGetRatedMoviesQuery } from "../store/user/user.api";
import { saveToStorage } from "../helpers";

export const useLoadUserMovies = () => {
  const { isAuth, id } = useAppSelector((state) => state.auth.entities);
  const [loadRated] = useLazyGetRatedMoviesQuery();
  const [loadFavorite] = useLazyGetFavoriteMoviesQuery()

  useEffect(() => {
    if (isAuth) {
      loadRated(id!)
        .unwrap()
        .then((res) => saveToStorage("ratedMovies", res));
      loadFavorite(id!)
        .unwrap()
        .then((res) => saveToStorage("favoriteMovies", res));
    }
  }, [isAuth]);
};
