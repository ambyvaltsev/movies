import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import s from "./Movies.module.scss";

const items = ["Movies", "Genres", "Countries"];

export const Movies = () => {
  const [active, setActive] = useState<string>("Movies");

  return (
    <div className={s.container}>
      <h1 className={s.title}>Lists</h1>
      <nav className={s.navigation}>
        <ul className={s.navigation__list}>
          {items.map((item, index) => (
            <Link to={`${item === 'Movies' ? '' : item.toLowerCase()}`} key={index}>
              <li
                
                className={`${s.navigation__item} ${active === item && s.active}`}
                onClick={() => setActive(item)}
              >
                {item}
              </li>
            </Link>
          ))}
        </ul>
      </nav>
      <main className={s.content}>
        <Outlet />
      </main>
    </div>
  );
};
