import React from "react";
import { useRoutes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";


const Router = ({ allRoutes }) => {
    // const routes = useRoutes([...allRoutes])
    const routes = useRoutes(
        allRoutes.map(route => {
            if (route.protected) {
                return {
                    ...route,
                    element: <PrivateRoute element={route.element} />,
                };
            }
            return route;
        })
    );

    // console.log(routes);
    return routes;
}

export default Router