import { FC, ReactNode } from "react";
import { About, Description, RelatedContent, RelatedList } from "./components";
import s from "./Info.module.scss";

interface IInfoProps {
  children: ReactNode;
}

interface IInfoExtension {
  Description: typeof Description;
  About: typeof About
  RelatedContent: typeof RelatedContent
  RelatedList: typeof RelatedList
}

export const Info: FC<IInfoProps> & IInfoExtension = ({ children }) => {
  return <div className={s.container}>{children}</div>;
};

Info.Description = Description;
Info.About = About;
Info.RelatedContent = RelatedContent;
Info.RelatedList = RelatedList;