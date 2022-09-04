import { FC, ReactNode } from 'react';
import { Description, Rating, ReleaseDate, Details } from './components';
import s from './Card.module.scss';


interface ICardExtensions {
  Description: typeof Description
  ReleaseDate: typeof ReleaseDate
  Rating: typeof Rating
  Details: typeof Details
}

interface ICardProps {
  children: ReactNode;
  poster: string;
  alt: string
}


export const Card:FC<ICardProps> & ICardExtensions = ({children, poster, alt}) => {



  return (
    <div className={s.container}>
      <div className={s.poster}>
        <img src={poster} alt={alt} />
      </div>
      {children}
    </div>
  )
}

Card.Description = Description
Card.ReleaseDate = ReleaseDate
Card.Rating = Rating
Card.Details = Details