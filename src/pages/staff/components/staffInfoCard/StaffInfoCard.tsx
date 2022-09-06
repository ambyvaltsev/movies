import { useGetMovieQuery } from "../../../../store/movies/movies.api";
import s from "./StaffInfoCard.module.scss";
import { FC } from "react";
import { Card, Poster } from "../../../../components";

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

  return (
    <>
      {data && (
        <div className={s.container} style={{ top: `${info.y + 10}px`, left: `${info.x + 10}px` }}>
          <Card>
            <Poster url={data.posterUrl} alt={data?.nameEn || data?.nameRu} />
            <Card.Description title={data?.nameEn || data?.nameRu}>
              <Card.ShortInfo title="Genre: " text={data?.genres.join(", ")} />
              <Card.ShortInfo title="Year: : " text={data?.year} />
              <Card.ShortInfo title="Kinopoisk raiting: " text={data?.ratingKinopoisk} />
            </Card.Description>
          </Card>
        </div>
      )}
    </>
  );
};
