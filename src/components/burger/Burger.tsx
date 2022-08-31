import { FC, useState } from "react";
import s from "./Burger.module.scss";
import { Link } from "react-router-dom";
import { RiMenuLine } from "react-icons/ri";
import { Menu } from "../../components";

export const Burger: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={isOpen ? `${s.container} ${s.mobile}` : s.container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className={s.menu__top}>
        <RiMenuLine className={s.menu__icon} />
        <Link to="/">
          <span className={s.menu__siteName}>Movies</span>
        </Link>
      </div>
      {isOpen && (
        <div className={s.menu__bottom}>
          <Menu mobile="mobile" />
        </div>
      )}
    </div>
  );
};
