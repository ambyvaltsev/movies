import { FC, ReactNode } from 'react';
import { Description, Rating, ReleaseDate, Details } from './components';
import s from './MovieCard.module.scss';


interface IMovieCardExtensions {
  Description: typeof Description
  ReleaseDate: typeof ReleaseDate
  Rating: typeof Rating
  Details: typeof Details
}

interface IMovieCardProps {
  children: ReactNode;
  poster: string;
  alt: string
}


export const MovieCard:FC<IMovieCardProps> & IMovieCardExtensions = ({children, poster, alt}) => {



  return (
    <div className={s.container}>
      <div className={s.poster}>
        <img src={poster} alt={alt} />
      </div>
      {children}
    </div>
  )
}

MovieCard.Description = Description
MovieCard.ReleaseDate = ReleaseDate
MovieCard.Rating = Rating
MovieCard.Details = Details