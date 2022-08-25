import { FC } from "react";
import {  IRelease } from "../../models";
import { ReleaseItem } from "../../pages/homePage/components";
import s from "./ReleasesList.module.scss";

interface IReleaseListProps {
  data: IRelease[] 
  limit?: number;

}

export const ReleasesList: FC<IReleaseListProps> = ({ data, limit = 5 }) => {
  
    
  return (
    <div className={s.container}>
      <ul className={s.list}>
        {data && data.map((item, index) => {
          if (index < limit) {
            return <ReleaseItem key={item.id} index={index} {...item} />;
          }
        })}
      </ul>
    </div>
  );
};
