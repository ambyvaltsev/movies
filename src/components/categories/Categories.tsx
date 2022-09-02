import s from "./Categories.module.scss";
import { allCategories } from "../../helpers";
import { ICategoryItem } from "../../helpers/vars";
import { useParams, Link } from "react-router-dom";
import { MovieCard } from "../../components";

export const Categories = () => {
  const params = useParams();
  const category = params.category ? params.category : "movies";

  return (
    <section className={s.container}>
      {allCategories[category].map((item: ICategoryItem, index) => {
        return (
          <Link to={`/${item.id}`} key={index}>
            <MovieCard poster={item.posterUrl} alt={item.title}>
              <MovieCard.Description title={item.title} subtitle={`${item.total ? item.total : ""}`} />
            </MovieCard>
          </Link>
        );
      })}
    </section>
  );
};
