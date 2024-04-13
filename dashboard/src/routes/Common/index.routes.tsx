import Login from "../../pages/Authentication/Login/Login";
import Register from "../../pages/Authentication/Register/Register";

export const allCommonRoutes = [
    {
        path: "/",
        element: <Login />,
    },
    {
        path: "/register",
        element: <Register />,
    },
];
