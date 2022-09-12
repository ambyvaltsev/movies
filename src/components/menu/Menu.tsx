import { FC, ReactNode } from "react";
import { Desktop, Mobile } from "./components";
import s from "./Menu.module.scss";

interface IMenuExtension {
  Desktop: typeof Desktop;
  Mobile: typeof Mobile;
}

interface IMenuProps {
  children: ReactNode;
}

export const Menu: FC<IMenuProps> & IMenuExtension = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

Menu.Desktop = Desktop;
Menu.Mobile = Mobile;
