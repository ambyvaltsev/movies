import s from './Preloader.module.scss';



export const Preloader = () => {

  return (
    <div className={s.container}>
      <div className={s.spinner}></div>
    </div>
  )
}