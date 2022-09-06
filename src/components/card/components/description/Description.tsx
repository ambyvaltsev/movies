import { FC, ReactNode } from "react";
import s from "./Description.module.scss";

interface IDescriptionProps {
  children?: ReactNode;
  title: string;
  subtitle?: string | string[];
}

export const Description: FC<IDescriptionProps> = ({ children, title, subtitle }) => {
  return (
    <div className={s.container}>
      <h6 className={s.title}>{title}</h6>
      <span className={s.subtitle}>{subtitle}</span>
      {children}
    </div>
  );
};
