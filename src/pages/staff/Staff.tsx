import { useParams } from "react-router-dom";
import { useGetSpecificStaffQuery } from "../../store/movies/staff.api";
import s from "./Staff.module.scss";
import { Preloader, Info, Poster } from "../../components";
import { ISingleUnit } from "../../store/movies/types";
import { StaffInfoCard } from "./components";

import { useState } from "react";

export const Staff = () => {
  const [info, setInfo] = useState<{ id: string; x: number; y: number }>({ id: "", x: 0, y: 0 });
  const { id } = useParams();
  const { isError, isLoading, data } = useGetSpecificStaffQuery(id!);

  const movies =
    data &&
    data?.films.reduce((acc: ISingleUnit[], cur) => {
      return [...acc, { id: cur.filmId, nameRu: cur.nameRu, nameEn: cur.nameEn }];
    }, []);
  const openCard = (e: any) => {
    if (e.target.dataset.card) {
      const left =
        e.clientX + 280 > document.documentElement.clientWidth
          ? document.documentElement.clientWidth - 280
          : e.pageX;
      const top = e.clientY + 150 > document.documentElement.clientHeight ? e.pageY - 150 : e.pageY;
      setInfo({ id: e.target.dataset.card, x: left, y: top - 70 });
    }
  };
  const items = [
    { title: "Career", person: data?.profession, type: "movie", isClickable: false },
    { title: "Growth", person: data?.growth || "", type: "movie", isClickable: true },
    { title: "Date of birth", person: data?.birthday || "", type: "movie", isClickable: true },
    { title: "Place of Birth", person: data?.birthplace || "", type: "movie", isClickable: false },
    { title: "Total films", person: data?.films.length, type: "movie", isClickable: true },
  ];

  const closeCard = () => {
    setInfo({ ...info, id: "" });
  };
  if (isLoading) {
    return <Preloader />;
  }
  return (
    <Info>
      {data && (
        <div className={s.content}>
          <Poster url={data?.posterUrl} alt={data?.nameEn || data?.nameRu} />
          <Info.Description title={data?.nameEn || data.nameRu} subtitle={data?.nameEn && data.nameRu}>
            <Info.About title={`About person`} items={items} openCard={openCard} closeCard={closeCard}>
              <Info.RelatedContent title="Movies">
                {movies && <Info.RelatedList items={movies} link="movie" />}
              </Info.RelatedContent>
            </Info.About>
          </Info.Description>
        </div>
      )}
      {info.id && <StaffInfoCard info={info} />}
    </Info>
  );
};
