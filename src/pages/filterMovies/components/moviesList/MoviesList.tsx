import { useParams } from 'react-router-dom';
import s from './MoviesList.module.scss';
import { allCategories } from '../../../../helpers';
import { useGetAllMoviesQuery } from '../../../../store/movies/movies.api';



export const MoviesList = () => {
  const {id} = useParams()
  const { isError, isLoading, data } = useGetAllMoviesQuery()
  console.log(data)

  return (
    <div className={s.container}>
      <h1 className={s.title}>{allCategories.movies.find(m => m.id === id)?.title || 'All movies'} </h1>
    </div>
  )
}



