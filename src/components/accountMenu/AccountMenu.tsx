import s from "./AccountMenu.module.scss";
import { ReactNode, FC, useEffect } from "react";
import { Badge, Navigation } from "./components";
import { useState, useRef } from "react";
import { useAppSelector } from "../../hooks";

interface IAccountExtension {
  Badge: typeof Badge;
  Navigation: typeof Navigation;
}

interface IAccountProps {
  children?: ReactNode;
}

export const AccountMenu: FC<IAccountProps> & IAccountExtension = ({ children }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const isAuth = useAppSelector((state) => state.auth.entities.isAuth);

  const closeMenu = (e: any) => {
    if (menuRef.current && !e.path.includes(menuRef.current)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    setIsOpen(false);
  }, [isAuth]);

  useEffect(() => {
    document.body.addEventListener("click", closeMenu);
    return () => document.body.removeEventListener("click", closeMenu);
  }, []);

  return (
    <div
      className={s.container}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
      ref={menuRef}
    >
      <AccountMenu.Badge onClick={() => setIsOpen(true)} />
      {isOpen && <AccountMenu.Navigation />}
    </div>
  );
};

AccountMenu.Badge = Badge;
AccountMenu.Navigation = Navigation;
