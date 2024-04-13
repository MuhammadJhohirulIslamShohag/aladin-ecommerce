import Login from "../../pages/Authentication/Login/Login";
import Register from "../../pages/Authentication/Register/Register";
import AddProductPage from "../../pages/Product/AddProduct";
import ProductPage from "../../pages/Product/Product";

export const allCommonRoutes = {
    children: [
        {
            path: "/products",
            element: <ProductPage />,
        },
        {
            path: "/products/add-product",
            element: <AddProductPage />,
        },
    ],
    single: [
        {
            path: "/",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ],
};
