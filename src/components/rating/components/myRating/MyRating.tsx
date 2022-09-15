import s from './MyRating.module.scss';





export const MyRating = () => {




  return (
    <div className={s.container}>
      <div className={s.rating}>
        <span className={s.rating__title}>My rating:</span>
        <span className={s.rating__value}>10</span>
        <button className={s.rating__btnDelete}>Delete</button>
      </div>
      <span className={s.date}>Date</span>
    </div>
  )
}