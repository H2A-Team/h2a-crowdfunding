import { RouteObject, Navigate } from "react-router-dom";
import AppFrame from "../components/app-frame";
import NotFound from "../components/error-pages/not-found";
import Forbidden from "../components/error-pages/forbidden";
import SingleColumnLayout from "../layouts/single-column-layout";
import ExploreProjects from "../pages/explore-projects";
import LaunchProject from "../pages/launch-project";

export const routes: RouteObject[] = [
    {
        path: "/",
        element: <AppFrame layout={<SingleColumnLayout />} />,
        children: [
            {
                path: "",
                element: <Navigate to="/explore" />,
            },
            {
                path: "/explore",
                element: <ExploreProjects />,
            },
            {
                path: "/launch-ido",
                element: <LaunchProject />,
            },
            // Do not change below segment
            {
                path: "404",
                element: <NotFound />,
            },
            {
                path: "403",
                element: <Forbidden />,
            },
        ],
    },
    {
        path: "*",
        element: <Navigate to="/404" replace={true} />,
    },
];
