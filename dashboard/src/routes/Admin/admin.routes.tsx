import CategoriesPage from "../../pages/Admin/Category/Categories";
import ColorPage from "../../pages/Admin/Color/Color";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import AddProductPage from "../../pages/Admin/Product/AddProduct";
import ProductPage from "../../pages/Admin/Product/Product";

export const adminSingleRoutes = [
    {
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        path: "products",
        element: <ProductPage />,
    },
    {
        path: "products/addProduct",
        element: <AddProductPage />,
    },
    {
        path: "categories",
        element: <CategoriesPage />,
    },
    {
        path: "colors",
        element: <ColorPage />,
    },
];
