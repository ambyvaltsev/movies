import { Link } from "react-router-dom";
import s from "./Premiere.module.scss";
import { IoIosArrowForward } from "../../assets";
import { MoviesList } from "../../components";
import { useGetReleasesQuery} from "../../store/movies/movies.api";
import { FC, useEffect, useRef, useState } from "react";
import { useObserver } from "../../hooks";
import { PremiereDateSelector } from "./components";
import { years, months } from "../../helpers/vars";
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
  useEffect(() => {
    console.log(data);
  }, [isLoading]);
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
      <div className={s.content}>
        <h1 className={s.title}>Movie premiere schedule</h1>
        <div className={s.selectors}>
          <PremiereDateSelector
            data={years}
            setSelectedDate={(e) => setSelectedDate({ ...selectedDate, year: e.target.textContent })}
            selectedDate={selectedDate.year}
          />
          <PremiereDateSelector
            data={months}
            setSelectedDate={(e) => setSelectedDate({ ...selectedDate, month: e.target.textContent })}
            selectedDate={selectedDate.month}
          />
        </div>
        {data && <MoviesList listData={data} limit={limit} />}
        <div className={s.observableBlock} ref={observableBlock}></div>
      </div>
    </div>
  );
};
