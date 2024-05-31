import Login from "../../pages/Authentication/Login/Login";
import Register from "../../pages/Authentication/Register/Register";
import CouponPage from "../../pages/Coupon/Coupon";
import AddProductPage from "../../pages/Product/AddProduct";
import ProductPage from "../../pages/Product/Product";
import BrandPage from "../../pages/Admin/Brand/Brand";
import CategoriesPage from "../../pages/Admin/Category/Categories";
import ColorPage from "../../pages/Admin/Color/Color";
import SizePage from "../../pages/Admin/Size/Size";
import SubCategoryPage from "../../pages/Admin/SubCategory/SubCategory";

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
        {
            path: "/coupons",
            element: <CouponPage />,
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
        {
            path: "categories",
            element: <CategoriesPage />,
        },
        {
            path: "colors",
            element: <ColorPage />,
        },
    ],
    single: [
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/register",
            element: <Register />,
        },
    ],
};
