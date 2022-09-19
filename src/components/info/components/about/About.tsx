import { FC, ReactNode } from "react";
import s from "./About.module.scss";
import { AboutItem } from "../../components";
import { ISingleUnit } from "../../../../store/movies/types";

interface IAboutProps {
  title: string;
  children: ReactNode;
  openCard: (e: any) => void;
  closeCard: (e: any) => void;
  items: IInfoItem[];
}
export interface IInfoItem {
  title: string;
  movie?: string[] | string;
  staff?: ISingleUnit[];
  person?: string | string[] | number;
  type: string;
  isClickable: boolean;
}

export const About: FC<IAboutProps> = ({ title, children, openCard, closeCard, items }) => {
  return (
    <section className={s.container} onMouseOver={openCard} onMouseOut={closeCard}>
      <h2 className={s.title}>{title}</h2>
      <div className={s.content}>
        <div className={s.info}>
          {items.map((i, index) => (
            <AboutItem key={index} item={i} />
          ))}
        </div>
        {children}
      </div>
    </section>
  );
};
