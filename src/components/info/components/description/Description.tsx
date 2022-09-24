import { FC, ReactNode } from "react";
import { useParams } from "react-router-dom";
import { Card } from "../../../card/Card";
import s from "./Description.module.scss";

interface IDescriptionProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const Description: FC<IDescriptionProps> = ({ title, children, subtitle }) => {
  const {id} = useParams()
  return (
    <div className={s.container}>
      <div className={s.header}>
        <div className={s.header__titles}>
          <h1 className={s.header__title}>{title}</h1>
          <span className={s.header__subtitle}>{subtitle}</span>
        </div>
        <div className={s.header__btnFavorite}>
          <Card.FavoriteBadge id={+id!} />
        </div>
      </div>
      {children}
    </div>
  );
};
