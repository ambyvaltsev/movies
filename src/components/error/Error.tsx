import { Link } from "react-router-dom";
import s from "./Error.module.scss";

export const Error = () => {
  return (
    <div className={s.container}>
      <h4 className={s.text}>Oops! Something is going wrong</h4>
      <Link to='/'>
        <span className={s.link}>To Home</span>
      </Link>
    </div>
  );
};
