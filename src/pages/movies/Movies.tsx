import { useState } from "react";
import { Category } from "../../components";
import s from "./Movies.module.scss";
import { categoryMovies } from "../../helpers";
const items = ["Movies", "Genres", "Countries", "Years", "TV series"];

export const Movies = () => {
  const [active, setActive] = useState<string>("Movies");

  return (
    <div className={s.container}>
      <h1 className={s.title}>Lists</h1>
      <nav className={s.navigation}>
        <ul className={s.navigation__list}>
          {items.map((item, index) => (
            <li
              key={index}
              className={`${s.navigation__item} ${active === item && s.active}`}
              onClick={() => setActive(item)}
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
      <main className={s.content}>
        <section className={s.categories}>
          {categoryMovies.map((item) => (
            <Category key={item.key} info={item} />
          ))}
        </section>
      </main>
    </div>
  );
};
