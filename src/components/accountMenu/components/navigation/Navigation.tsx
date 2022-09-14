import s from "./Navigation.module.scss";
import { AccountMenu } from "../../../../components";
import { useActions, useAppSelector } from "../../../../hooks";

export const Navigation = () => {
  const { logoutUser } = useActions();
  const user = useAppSelector((state) => state.auth.entities.login);
  return (
    <nav className={s.container}>
      <div className={s.header}>
        <span className={s.header__login}>{user}</span>
        <AccountMenu.Badge />
      </div>
      <ul className={s.nav}>
        <li className={s.nav__item}>Ratings</li>
        <li className={s.nav__item}>Movies</li>
      </ul>
      <button className={s.btnLogout} onClick={() => logoutUser()}>
        Log Out
      </button>
    </nav>
  );
};
