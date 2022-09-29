import "./index.scss";
import { withProviders } from "./providers";
import { AppRoutes } from "../components";
import { Header } from "../layout";
import { FC } from "react";

const App: FC = () => {
  return (
    <div className="app">
      <Header />
      <AppRoutes />
    </div>
  );
};

export default withProviders(App);
