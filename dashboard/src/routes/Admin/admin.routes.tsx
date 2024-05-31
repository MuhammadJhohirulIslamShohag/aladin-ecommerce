import AdminDashboard from "../../pages/Admin/AdminDashboard/AdminDashboard";
import AllOrders from "../../pages/Admin/Order/Order";

export const adminSingleRoutes = [
    {
        path: "dashboard",
        element: <AdminDashboard />,
    },
    {
        path: "orders",
        element: <AllOrders />,
    },
];
