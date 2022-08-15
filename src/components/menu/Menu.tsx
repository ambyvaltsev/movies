import { FC } from "react";
import s from "./Menu.module.scss";
import { NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { MdMovie } from "react-icons/md";

interface IMenuProps {
  mobile?: boolean;
}
export const Menu: FC<IMenuProps> = ({ mobile }) => {

  return (
    <div className={mobile ? `${s.container} ${s.mobile}` : `${s.container}`}>
      <ul className={s.list}>
        <NavLink to="/" style={({isActive}) => ({borderBottom: isActive ? '1px solid red' : ''})}>
          <li className={s.item}>
            <AiFillHome className={mobile ? `${s.item__icon} ${s.mobile}` : s.item__icon} />
            <span className={mobile ? `${s.item__text} ${s.mobile}` : s.item__text}>Home</span>
          </li>
        </NavLink>
        <NavLink to="movies">
          <li className={s.item}>
            <MdMovie className={mobile ? `${s.item__icon} ${s.mobile}` : s.item__icon} />
            <span className={mobile ? `${s.item__text} ${s.mobile}` : s.item__text}>Movies</span>
          </li>
        </NavLink>
        <NavLink to="tvseries">
          <li className={s.item}>
            <MdMovie className={mobile ? `${s.item__icon} ${s.mobile}` : s.item__icon} />
            <span className={mobile ? `${s.item__text} ${s.mobile}` : s.item__text}>TV series</span>
          </li>
        </NavLink>
      </ul>
    </div>
  );
};
