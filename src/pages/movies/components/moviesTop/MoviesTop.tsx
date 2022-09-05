import s from './MoviesTop.module.scss';
import { Card } from '../../../../components';
import { useGetTopMoviesQuery } from '../../../../store/movies/movies.api';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';




export const MoviesTop = () => {
  const { id } = useParams()
  const [params, setParams] = useState({
    type: '',
    page: 1,
  });
  const {isError, isLoading, data: top } = useGetTopMoviesQuery(params)
  console.log(id)
  useEffect(() => {
    if (id === 'best250') {
      setParams({type: 'TOP_250_BEST_FILMS', page: 1})
    } else if (id === 'popular100') {
      setParams({type: 'TOP_100_POPULAR_FILMS', page: 1})
    }
  }, [id])

  return (
    <div className={s.container}>
      <h1 className={s.title}>{} </h1>
      <section className={s.movies}>
        <ul className={s.movies__list}>
          {top &&
            top.films.map((film, index) => {
              return (
                <Card poster={film.posterUrl} alt={film.nameEn || film.nameRu} key={index}>
                  <Card.Description
                    title={film.nameEn || film.nameRu}
                    subtitle={film.nameEn && film.nameRu}
                  ></Card.Description>
                </Card>
              );
            })}
        </ul>
      </section>
    </div>
  )
}