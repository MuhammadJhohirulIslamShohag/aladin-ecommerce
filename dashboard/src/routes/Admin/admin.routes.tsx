import BrandPage from "../../pages/Admin/Brand/Brand";
import CategoriesPage from "../../pages/Admin/Category/Categories";
import ColorPage from "../../pages/Admin/Color/Color";
import Dashboard from "../../pages/Admin/Dashboard/Dashboard";
import AddProductPage from "../../pages/Admin/Product/AddProduct";
import ProductPage from "../../pages/Admin/Product/Product";
import SizePage from "../../pages/Admin/Size/Size";
import SubCategoryPage from "../../pages/Admin/SubCategory/SubCategory";

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
