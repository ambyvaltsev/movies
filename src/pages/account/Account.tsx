import { NavLink, Outlet, useMatch } from "react-router-dom";
import s from "./Account.module.scss";

export const Account = () => {
  const match = useMatch({
    path: "/account",
    end: true,
  });
  return (
    <div className={s.container}>
      <div className={s.content}>
        <nav className={s.navigation}>
          <ul className={s.navigation__list}>
            <NavLink to="/account">
              {({ isActive }) => (
                <li className={`${s.navigation__item} ${isActive && match && s.active}`}>Profile</li>
              )}
            </NavLink>
            <NavLink to="ratings">
              {({ isActive }) => <li className={`${s.navigation__item} ${isActive && s.active}`}>Ratings</li>}
            </NavLink>
          </ul>
        </nav>
        <Outlet />
      </div>
    </div>
  );
};
