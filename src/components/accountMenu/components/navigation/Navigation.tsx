import s from "./Navigation.module.scss";
import { AccountMenu } from "../../../../components";
import { useActions, useAppSelector } from "../../../../hooks";
import { Link, useNavigate } from "react-router-dom";
import { FC } from "react";
import { removeFromStorage } from "../../../../helpers";
interface INavigationProps {}

export const Navigation: FC<INavigationProps> = () => {
  const navigate = useNavigate();
  const { logoutUser } = useActions();
  const user = useAppSelector((state) => state.auth.entities.login);
  const logout = () => {
    removeFromStorage("auth");
    logoutUser();
    navigate("/");
  };
  return (
    <nav className={s.container}>
      <div className={s.header}>
        <Link to="account">
          <span className={s.header__login}>{user}</span>
        </Link>
        <AccountMenu.Badge />
      </div>
      <ul className={s.nav}>
        <li className={s.nav__item}>Ratings</li>
        <li className={s.nav__item}>Movies</li>
      </ul>
      <button className={s.btnLogout} onClick={logout}>
        Log Out
      </button>
    </nav>
  );
};
