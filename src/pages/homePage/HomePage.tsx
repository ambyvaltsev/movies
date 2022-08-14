import { Menu } from "../../components";
import s from "./HomePage.module.scss";

export const HomePage = () => {
  return (
    <div className={s.container}>
      <Menu />
      <div>Home page</div>
    </div>
  );
};
