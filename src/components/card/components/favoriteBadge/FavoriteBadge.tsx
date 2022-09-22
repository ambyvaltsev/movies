import s from "./FavoriteBadge.module.scss";
import { BsBookmarkCheckFill, BsBookmarkXFill } from "../../../../assets";
import { useState } from "react";
import { useAddToFavotitesMutation, useDeleteFavotiteMutation } from "../../../../store/user/user.api";
import { useAppSelector } from "../../../../hooks";
import { saveToStorage } from "../../../../helpers";
import { FC } from "react";

interface IFavoriteBadgeProps {
  id: number;
}

export const FavoriteBadge: FC<IFavoriteBadgeProps> = ({ id }) => {
  const { isAuth, id: userId } = useAppSelector((state) => state.auth.entities);
  const favoriteMovies = useAppSelector((state) => state.user.favoriteMovies);
  const [addToFavorites] = useAddToFavotitesMutation();
  const [deleteFavorite] = useDeleteFavotiteMutation();
  const activeStyle = favoriteMovies.some((item) => item.movieId === id) && s.active;

  const pickMovie = (e: any) => {
    if (!isAuth) return;
    if (favoriteMovies.some((item) => item.movieId === id)) {
      return;
    }
    addToFavorites({
      id: userId!,
      movies: [
        ...favoriteMovies,
        {
          movieId: id!,
          date: new Date().toLocaleString("en-US", { year: "numeric", month: "long", day: "numeric" }),
        },
      ],
    })
      .unwrap()
      .then((res) => {
        saveToStorage("favoriteMovies", res);
      });
  };

  const deleteMovie = () => {
    const movies = favoriteMovies.filter((movie) => movie.movieId !== id);

    deleteFavorite({ id: userId!, movies: [...movies] })
      .unwrap()
      .then((res) => saveToStorage("favoriteMovies", [...res]));
  };
  return (
    <>
      {favoriteMovies.some((item) => item.movieId === id) ? (
        <button className={s.container} onClick={deleteMovie}>
          <BsBookmarkXFill className={`${s.badge} ${activeStyle}`} />
        </button>
      ) : (
        <button className={s.container} onClick={pickMovie}>
          <BsBookmarkCheckFill className={s.badge} />
        </button>
      )}
    </>
  );
};
