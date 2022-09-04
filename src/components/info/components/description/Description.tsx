import { FC, ReactNode } from "react";
import s from "./Description.module.scss";

interface IDescriptionProps {
  children: ReactNode;
  title: string;
  subtitle: string
}

export const Description: FC<IDescriptionProps> = ({ title, children, subtitle }) => {
  return (
    <div className={s.container}>
      <h1 className={s.title}>{title}</h1>
      <span>{subtitle}</span>
      {children}
    </div>
  );
};
