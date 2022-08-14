import "./index.scss";
import { withProviders } from "./providers";
import { AppRoutes } from "../components";
import { Header } from "../layout";

function App() {
  return (
    <div>
      <Header />
      <AppRoutes />
    </div>
  );
}

export default withProviders(App);
