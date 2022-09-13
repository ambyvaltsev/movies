import s from "./Auth.module.scss";
import bg from "../../assets/img/auth_bg.jpeg";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const BGStyle = {
  backgroundImage: `url(${bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
};

export const Auth = () => {
  return (
    <div className={s.container} style={BGStyle}>
      <div>
        <Outlet />
      </div>
      <div>
        <Link to='auth/sigin'>
          <span>signtin</span>
        </Link>
        <Link to='auth/signup'>
          <span>signtup</span>
        </Link>
      </div>
    </div>
  );
};
