import { FC } from "react";
import s from "./Badge.module.scss";

interface IBadgeProps {
  onClick?: () => void
}


export const Badge: FC<IBadgeProps> = ({onClick}) => {
  return (
    <div
      className={s.container} 
      onClick={onClick}
    ></div>
  );
};
