import { FC } from "react";
import { useGetSpecificStaffQuery } from "../../../../store/movies/staff.api";
import s from "./MovieInfoCard.module.scss";
import { Card, Poster } from "../../../../components";

interface IInfo {
  id: string;
  x: number;
  y: number;
}
interface IMovieInfoCardProps {
  info: IInfo;
}

export const MovieInfoCard: FC<IMovieInfoCardProps> = ({ info }) => {
  const { isError, isLoading, data } = useGetSpecificStaffQuery(info.id!);

  const movies =
    data && data?.films.length > 0
      ? data?.films
          .filter((film) => film.rating)
          .sort((a, b) => +b.rating - +a.rating)
          .reduce((acc: any, cur) => {
            return [...acc, cur.nameEn];
          }, [])
          .slice(0, 5)
          .join(", ")
      : "";

  return (
    <>
      {data && (
        <div className={s.container} style={{ top: `${info.y + 10}px`, left: `${info.x + 10}px` }}>
          <Card>
            <Poster url={data.posterUrl} alt={data?.nameEn || data?.nameRu} />
            <Card.Description title={data?.nameEn || data?.nameRu}>
              <Card.ShortInfo title="Profession: " text={data?.profession || ""} />
              <Card.ShortInfo title="Best movies: : " text={movies} />
            </Card.Description>
          </Card>
        </div>
      )}
    </>
  );
};
