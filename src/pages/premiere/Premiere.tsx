import { Link } from "react-router-dom";
import s from "./Premiere.module.scss";
import { IoIosArrowForward } from "../../assets";
import { MoviesList } from "../../components";
import { useGetReleasesQuery } from "../../store/movies/movies.api";
import { FC, useRef, useState } from "react";
import { useObserver } from "../../hooks/useObserver";


export const Premiere: FC = () => {
  const observableBlock = useRef(null);

  const [limit, setLimit] = useState(10);

  const [selectedDate, setSelectedDate] = useState({
    year: +new Date().toLocaleString("en-US", { year: "numeric" }),
    month: new Date().toLocaleString("en-US", { month: "long" }),
  });
  const { isError, isLoading, data } = useGetReleasesQuery(selectedDate);

  useObserver(isLoading, observableBlock, limit < data?.length!, () => {
    setLimit((limit) => limit + 5);
  });

  if (isError) {
    return <div>Error</div>;
  }
  if (isLoading) {
    return <div>Loading</div>;
  }
  return (
    <div className={s.container}>
      <div className={s.navigation}>
        <Link to="/" className={s.navigation__link}>
          Home page
        </Link>
        <IoIosArrowForward />
        <span>Movie premiere schedule</span>
      </div>
      <h1 className={s.title}>Movie premiere schedule</h1>
      {data && <MoviesList listData={data} limit={limit} />}
      <div className={s.observableBlock} ref={observableBlock}></div>
    </div>
  );
};
