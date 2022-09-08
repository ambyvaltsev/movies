import { Outlet, useParams } from "react-router-dom";
import s from "./Movies.module.scss";
import { Link } from "react-router-dom";

export const Movies = () => {
  const { id } = useParams();

  return (
    <div className={s.container}>
      {id === "movies" && <aside className={s.filter}>Filter</aside>}
      <div className={s.content}>
        <nav className={s.navigation}>
          <ul className={s.navigation__list}>
            <Link to={"/movies"}>
              <li className={s.navigation__item}>All movies</li>
            </Link>
            <Link to={"best250"}>
              <li className={s.navigation__item}>Top best 250</li>
            </Link>
            <Link to={"popular100"}>
              <li className={s.navigation__item}>Top 100 popular</li>
            </Link>
          </ul>
        </nav>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
