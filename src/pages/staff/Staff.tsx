import { useParams } from "react-router-dom";
import { useGetSpecificStaffQuery } from "../../store/movies/staff.api";
import s from "./Staff.module.scss";
import { InfoItem, Preloader, RelatedInfoList } from "../../components";
import { ISingleUnit } from "../../models";
import { StaffInfoCard } from "./components";
import { useShowInfoCard } from "../../hooks";

export const Staff = () => {
  const { id } = useParams();
  const { isError, isLoading, data } = useGetSpecificStaffQuery(id!);
  const { info, ref } = useShowInfoCard(isLoading);
  const movies =
    data &&
    data?.films.reduce((acc: ISingleUnit[], cur) => {
      return [...acc, { id: cur.filmId, nameRu: cur.nameRu, nameEn: cur.nameEn }];
    }, []);
  if (isLoading) {
    return <Preloader/>
  }
  return (
    <div className={s.container}>
      <div className={s.description__main}>
        <div className={s.main__poster}>
          <img src={data?.posterUrl} alt={data?.nameEn || data?.nameRu} />
        </div>
        <div className={s.main__content}>
          <h1 className={s.main__title}>{data?.nameEn || data?.nameRu}</h1>
          <div className={s.main__body}>
            <h2 className={s.body__title}>About person</h2>
            <section className={s.body__about} ref={ref}>
              <div className={s.about__info}>
                {data && (
                  <>
                    <InfoItem title="Career" info={data?.profession} />
                    <InfoItem title="Growth" info={data?.growth || ""} isClickable />
                    <InfoItem title="Date of birth" info={data?.birthday || ""} isClickable />
                    <InfoItem title="Place of Birth" info={data.birthplace || ""} />
                    <InfoItem title="Total films" info={data.films.length} isClickable />
                  </>
                )}
              </div>
              <div className={s.about__starring}>
                {movies && <RelatedInfoList movies={movies} title="Starring" />}
              </div>
            </section>
          </div>
        </div>
      </div>
      {info.id && <StaffInfoCard info={info} />}
    </div>
  );
};
