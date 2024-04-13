import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";

import { allAdminRoutes } from "./Admin/index.routes";
import { allCommonRoutes } from "./Common/index.routes";

const mainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/admin",
                children: [...allAdminRoutes],
            },
        ],
    },
    ...allCommonRoutes,
]);

export default mainRoutes;
