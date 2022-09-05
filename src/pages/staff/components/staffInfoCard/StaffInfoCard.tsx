import { useGetMovieQuery } from "../../../../store/movies/movies.api";
import s from "./StaffInfoCard.module.scss";
import { FC } from "react";
import {  Card } from "../../../../components";

interface IInfo {
  id: string;
  x: number;
  y: number;
}
interface IStaffInfoCardProps {
  info: IInfo;
}

export const StaffInfoCard: FC<IStaffInfoCardProps> = ({ info }) => {
  const { isError, isLoading, data } = useGetMovieQuery(info.id);

  const staffData = [
    { title: "Genre: ", text: data?.genres.join(", ") },
    { title: "Year: ", text: data?.year },
    { title: "Kinopoisk raiting: ", text: data?.ratingKinopoisk },
  ];

  return (
    <>
      {data && (
        <div className={s.container} style={{ top: `${info.y + 10}px`, left: `${info.x + 10}px` }}>
          <Card alt={data?.nameEn || data?.nameRu} poster={data.posterUrl}>
            <Card.Description title={data?.nameEn || data?.nameRu}>
              <Card.ShortInfo data={staffData} />
            </Card.Description>
          </Card>
        </div>
      )}
    </>
  );
};
