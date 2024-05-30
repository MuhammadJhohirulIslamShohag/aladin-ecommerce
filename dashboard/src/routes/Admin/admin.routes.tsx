import AdminDashboard from "../../pages/Admin/AdminDashboard/AdminDashboard";
import BrandPage from "../../pages/Admin/Brand/Brand";
import CategoriesPage from "../../pages/Admin/Category/Categories";
import ColorPage from "../../pages/Admin/Color/Color";

import SizePage from "../../pages/Admin/Size/Size";
import SubCategoryPage from "../../pages/Admin/SubCategory/SubCategory";


export const adminSingleRoutes = [
    {
        path: "dashboard",
        element: <AdminDashboard />,
    },
    {
        path: "categories",
        element: <CategoriesPage />,
    },
    {
        path: "colors",
        element: <ColorPage />,
    },
    {
        path: "sizes",
        element: <SizePage />,
    },
    {
        path: "sub-categories",
        element: <SubCategoryPage />,
    },
    {
        path: "brands",
        element: <BrandPage />,
    },
];
