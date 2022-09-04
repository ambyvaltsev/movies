import s from "./RelatedContent.module.scss";
import { IoIosArrowForward } from "../../../../assets";
import { FC, ReactNode } from "react";

interface IRelatedContentProps {
  title: string;
  children: ReactNode;
}

export const RelatedContent: FC<IRelatedContentProps> = ({ title, children }) => {
  return (
    <article className={s.container}>
      <div className={s.header}>
        <h3 className={s.title}>{title}</h3>
        <IoIosArrowForward className={s.icon} />
      </div>
      {children}
    </article>
  );
};
