import { Route } from "react-router-dom";




export const mapRoutes = (routes: any) => {
  function mapFunc(routes: any) {
    return routes.map((route: any, index: number) => {
      return (<Route key={index} path={!route.index && route.path} element={route.element} index={route.index}>
        {route.child ? mapFunc(route.child) : null}
      </Route>)
    });
  }
  return mapFunc(routes);
};