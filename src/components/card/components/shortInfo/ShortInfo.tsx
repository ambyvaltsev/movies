import s from "./ShortInfo.module.scss";
import { FC } from "react";

interface IShortInfoProps {
  title: string;
  text: string | number;
}

export const ShortInfo: FC<IShortInfoProps> = ({ title, text }) => {
  return (
    <p className={s.info}>
      <span className={s.info__title}>{title}</span>
      {text}
    </p>
  );
};
