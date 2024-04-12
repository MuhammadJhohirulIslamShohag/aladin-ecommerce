import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout/MainLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import ProductPage from "../pages/Product/Product";
import AddProductPage from "../pages/Product/AddProduct";
import CategoriesPage from "../pages/Category/Categories";

const mainRoutes = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Dashboard />,
            },
            {
                path: "/products",
                element: <ProductPage />,
            },
            {
                path: "/products/addProduct",
                element: <AddProductPage />,
            },
            {
                path: "/categories",
                element: <CategoriesPage />,
            },
        ],
    },
]);

export default mainRoutes;
