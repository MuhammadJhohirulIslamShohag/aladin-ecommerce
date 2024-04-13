import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout/MainLayout";

import { allAdminRoutes } from "./Admin/index.routes";
import { allCommonRoutes } from "./Common/index.routes";

const mainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            ...allCommonRoutes.children,
            {
                path: "/admin",
                children: [...allAdminRoutes],
            },
        ],
    },
    ...allCommonRoutes.single,
]);

export default mainRoutes;
