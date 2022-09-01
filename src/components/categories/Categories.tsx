import s from "./Categories.module.scss";
import { allCategories } from "../../helpers";
import { CategoryItem } from "../../components";
import { useParams } from "react-router-dom";

export const Categories = () => {

  const params = useParams()
  const category = params.category ? params.category : 'movies'

  return (
    <section className={s.container}>
       {allCategories[category].map((item: any, index) => (
        <CategoryItem key={index} info={item} />
      ))}
    </section>
  );
};
