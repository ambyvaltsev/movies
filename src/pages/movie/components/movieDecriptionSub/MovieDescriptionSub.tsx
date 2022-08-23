import { FC, useState } from "react";
import { useGetVideoQuery } from "../../../../store/movies/movies.api";
import { KinopoiskRating } from "../kinopoiskRating/KinopoiskRating";
import s from "./MuvieDescriptionSub.module.scss";

interface IMovieDescriptionSubProps {
  description: string;
  id: number;
}

export const MovieDescriptionSub: FC<IMovieDescriptionSubProps> = ({ description, id }) => {
  const [active, setActive] = useState<string>("Review");
  const { isError, isLoading, data: videos } = useGetVideoQuery(id);

  const video = videos?.items.find((i) => i.site === "YOUTUBE");

  const urlVideo = video?.url.split("=")[1];

  const setActiveItem = (e: any) => {
    setActive(e.target.textContent);
  };
  return (
    <div className={s.container}>
      <nav className={s.nav}>
        <span className={`${s.nav__item} ${active === "Review" && s._active}`} onClick={setActiveItem}>
          Review
        </span>
        <span className={`${s.nav__item} ${active === "Trailer" && s._active}`} onClick={setActiveItem}>
          Trailer
        </span>
        <span className={`${s.nav__item} ${active === "Images" && s._active}`} onClick={setActiveItem}>
          Images
        </span>
      </nav>
      <div className={s.content}>
        {active === "Review" && (
          <div className={s.review}>
            <p className={s.review__description}>{description}</p>
            <div className={s.review__ratings}>
              <h6 className={s.ratings__title}>Movie Rating</h6>
              <div className={s.ratings__versions}>
                <KinopoiskRating/>
              </div>
            </div>
          </div>
        )}
        {active === "Trailer" && urlVideo && (
          <div>
            <iframe
              width="560"
              height="315"
              src={`https://www.youtube.com/embed/${urlVideo}?modestbranding=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </div>
  );
};
