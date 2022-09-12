import s from "./Mobile.module.scss";
import { NavLink } from "react-router-dom";
import { RiMenuLine, AiFillHome, MdMovie, IoMdClose } from "../../../../assets";

import { FC, useState } from "react";

export const Mobile: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={s.container}>
      <button className={s.menu__btnOpen} onClick={() => setIsOpen(true)}>
        <RiMenuLine />
      </button>

      <div className={s.menu__content} style={{ left: `-${isOpen ? 0 : 100}%` }}>
        <ul className={s.menu__list}>
          <NavLink to="/">
            {({ isActive }) => (
              <li className={s.item}>
                <AiFillHome className={`${s.item__content} ${isActive && s.active}`} />
                <span className={`${s.item__content} ${isActive && s.active}`}>Home</span>
              </li>
            )}
          </NavLink>
          <NavLink to="lists">
            {({ isActive }) => (
              <li className={s.item}>
                <MdMovie className={`${s.item__content} ${isActive && s.active}`} />
                <span className={`${s.item__content} ${isActive && s.active}`}>Movies</span>
              </li>
            )}
          </NavLink>
          <NavLink to="tvseries">
            {({ isActive }) => (
              <li className={s.item}>
                <MdMovie className={`${s.item__content} ${isActive && s.active}`} />
                <span className={`${s.item__content} ${isActive && s.active}`}>TV series</span>
              </li>
            )}
          </NavLink>
        </ul>
        <button className={s.menu__btnClose} onClick={() => setIsOpen(false)}>
          <IoMdClose />
        </button>
      </div>
    </div>
  );
};
