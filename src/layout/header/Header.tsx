import { FC } from "react";
import s from "./Header.module.scss";
import { AccountMenu, Menu, Search } from "../../components";
import { Link } from "react-router-dom";
import { useAppSelector, useMatchMedia } from "../../hooks";

export const Header: FC = () => {
  const isAuth = useAppSelector((state) => state.auth.entities.isAuth);
  const { isSmallMobile, isMobile } = useMatchMedia();

  return (
    <div className={s.container}>
      <div className={s.content}>
        <div className={s.menu__wrapper}>
          {isMobile && <Menu.Mobile />}
          <Link to="/">
            <span className={s.siteName}>Movies</span>
          </Link>
        </div>
        <div className={s.search__wrapper_desktop}>{!isSmallMobile && <Search.DesktopView />}</div>
        {isSmallMobile && <Search.MobileView />}
        {isAuth ? (
          <AccountMenu />
        ) : (
          <Link to="auth">
            <div className={s.signin}>Sign In</div>
          </Link>
        )}
      </div>
    </div>
  );
};
