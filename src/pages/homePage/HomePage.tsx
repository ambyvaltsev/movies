import { Menu } from "../../components";
import { useMatchMedia } from "../../hooks";
import s from "./HomePage.module.scss";
import { Releases } from "./components";

export const HomePage = () => {
  const { isMobile } = useMatchMedia();

  return (
    <div className={s.container}>
      {isMobile || (
        <nav className={s.nav}>
          <Menu />
        </nav>
      )}
      <main className={s.main}>
        <Releases />
      </main>
    </div>
  );
};
