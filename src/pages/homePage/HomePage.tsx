import { Menu } from "../../components";
import { useMatchMedia } from "../../hooks";
import s from "./HomePage.module.scss";
import { ReleasesBlock, TopAwaitMovies } from "./components";

export const HomePage = () => {
  const { isMobile } = useMatchMedia();

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
