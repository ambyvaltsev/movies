import { FC, useState } from "react";
import s from "./MenuHeader.module.scss";
import { Link, useLocation } from "react-router-dom";
import { useMatchMedia } from "../../hooks";
import { RiMenuLine } from "react-icons/ri";
import { Menu } from "../menu/Menu";

export const MenuHeader: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { isMobile } = useMatchMedia();

  return (
    <div
      className={isOpen ? `${s.container} ${s.mobile}` : s.container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={s.menu__top}>
        {(isMobile || pathname !== "/") && <RiMenuLine className={s.menu__icon} />}
        <Link to="/">
          <span className={s.menu__siteName}>Movies</span>
        </Link>
      </div>
      {isOpen && (
        <div className={s.menu__bottom}>
          <Menu mobile='mobile' />
        </div>
      )}
    </div>
  );
};
