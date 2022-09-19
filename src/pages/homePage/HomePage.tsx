import { Menu } from "../../components";
import { useMatchMedia } from "../../hooks";
import s from "./HomePage.module.scss";
import { ReleasesBlock, TopAwaitMovies } from "./components";
import { useLoadUserMovies } from "../../hooks/useLoadUserMovies";

export const HomePage = () => {
  const { isMobile } = useMatchMedia();
  useLoadUserMovies()
  return (
    <div className={s.container}>
      {isMobile || (
        <nav className={s.nav}>
          <Menu.Desktop />
        </nav>
      )}
      <main className={s.main}>
        <TopAwaitMovies title="Top await movies" />
        <ReleasesBlock />
      </main>
    </div>
  );
};
