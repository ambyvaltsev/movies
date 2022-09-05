import { FC } from "react";
import s from "./Menu.module.scss";
import { NavLink } from "react-router-dom";
import { AiFillHome, MdMovie } from "../../assets";

interface IMenuProps {
  mobile?: string;
}
export const Menu: FC<IMenuProps> = ({ mobile = "" }) => {
  const styleActive = `${s.item__content} ${s[mobile]} ${s.active}`;
  const styleInactive = `${s.item__content} ${s[mobile]}`;

  return (
    <div className={`${s.container} ${s[mobile]}`}>
      <ul className={s.list}>
        <NavLink to="/">
          {({ isActive }) => (
            <li className={s.item}>
              <AiFillHome className={isActive ? styleActive : styleInactive} />
              <span className={isActive ? styleActive : styleInactive}>Home</span>
            </li>
          )}
        </NavLink>
        <NavLink to="lists">
          {({ isActive }) => (
            <li className={s.item}>
              <MdMovie className={isActive ? styleActive : styleInactive} />
              <span className={isActive ? styleActive : styleInactive}>Movies</span>
            </li>
          )}
        </NavLink>
        <NavLink to="tvseries">
          {({ isActive }) => (
            <li className={s.item}>
              <MdMovie className={isActive ? styleActive : styleInactive} />
              <span className={isActive ? styleActive : styleInactive}>TV series</span>
            </li>
          )}
        </NavLink>
      </ul>
    </div>
  );
};
