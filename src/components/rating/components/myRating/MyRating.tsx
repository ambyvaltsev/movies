import { IRatedMovie } from "../../../../store/user/types";
import s from "./MyRating.module.scss";
import { FC } from "react";
import { useAppSelector } from "../../../../hooks";
import { useParams } from "react-router-dom";
import { useDeleteRatedMovieMutation } from "../../../../store/user/user.api";
import { saveToStorage } from "../../../../helpers";

interface IMyRatingProps {
  movie: IRatedMovie;
}

export const MyRating: FC<IMyRatingProps> = ({ movie }) => {
  const {id} = useParams()
  const userId  = useAppSelector(state => state.auth.entities.id)
  const ratedMovies = useAppSelector((state) => state.user.ratedMovies);
  const [deleteRatingMovie] = useDeleteRatedMovieMutation();


  const handleDelete = () => {
    const movies = ratedMovies.filter((movie) => movie.movieId !== id);
    console.log(movies)
    deleteRatingMovie({ id: userId!, movies: [...movies] })
      .unwrap()
      .then((res) => saveToStorage("ratedMovies", [...res]));
  };
  return (
    <div className={s.container}>
      <div className={s.rating}>
        <span className={s.rating__title}>My rating:</span>
        <span className={s.rating__value}>{movie.rating}</span>
        <button className={s.rating__btnDelete} onClick={handleDelete}>
          Delete
        </button>
      </div>
      <span className={s.date}>{movie.date}</span>
    </div>
  );
};
