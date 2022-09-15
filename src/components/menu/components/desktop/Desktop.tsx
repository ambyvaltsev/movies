import { FC } from "react";
import s from "./Desktop.module.scss";
import { NavLink } from "react-router-dom";
import { AiFillHome, MdMovie } from "../../../../assets";

interface IMenuProps {}
export const Desktop: FC<IMenuProps> = () => {
  return (
    <div className={s.container}>
      <ul className={s.list}>
        <NavLink to="/">
          {({ isActive }) => (
            <li className={s.item}>
              <AiFillHome className={`${s.item__content} ${isActive && s.active}`} />
              <span className={`${s.item__content} ${isActive && s.active}`}>Home</span>
            </li>
          )}
        </NavLink>
        <NavLink to="/lists">
          {({ isActive }) => (
            <li className={s.item}>
              <MdMovie className={`${s.item__content} ${isActive && s.active}`} />
              <span className={`${s.item__content} ${isActive && s.active}`}>Movies</span>
            </li>
          )}
        </NavLink>
        <NavLink to="/tvseries">
          {({ isActive }) => (
            <li className={s.item}>
              <MdMovie className={`${s.item__content} ${isActive && s.active}`} />
              <span className={`${s.item__content} ${isActive && s.active}`}>TV series</span>
            </li>
          )}
        </NavLink>
      </ul>
    </div>
  );
};
