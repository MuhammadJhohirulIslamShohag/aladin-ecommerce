import AllOrders from "../../pages/Admin/Order/Order";
import AllBuyers from "../../pages/Admin/Users/AllBuyers";
import AllSellers from "../../pages/Admin/Users/AllSellers";
import RoleBasedPrivateRouter from "../ProtectRoute/RoleBasedPrivateRouter";

import { USER_ROLES } from "../../constants/role";

export const adminSingleRoutes = [
    {
        path: "orders",
        element: (
            <RoleBasedPrivateRouter role={USER_ROLES.seller}>
                <AllOrders />
            </RoleBasedPrivateRouter>
        ),
    },
    {
        path: "buyers",
        element: (
            <RoleBasedPrivateRouter role={USER_ROLES.seller}>
                <AllBuyers />
            </RoleBasedPrivateRouter>
        ),
    },
    {
        path: "sellers",
        element: (
            <RoleBasedPrivateRouter role={USER_ROLES.seller}>
                <AllSellers />
            </RoleBasedPrivateRouter>
        ),
    },
];
