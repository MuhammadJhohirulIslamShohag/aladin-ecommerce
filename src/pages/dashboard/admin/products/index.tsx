import { getProductsBySort } from "@/api/products";
import ProductsTable from "@/components/Dashboard/Admin/ProductsTable/ProductsTable";
import useCheckAdmin from "@/hooks/useCheckAdmin";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { IProduct } from "types/product.type";

const Products = ({ products }: { products: IProduct[] }) => {
    useCheckAdmin();
    const router = useRouter();
    const refreshData = () => {
        router.replace(router.asPath);
    };
    return (
        <DashboardLayout>
            <div>
                <ProductsTable data={products} refreshData={refreshData} />
            </div>
        </DashboardLayout>
    );
};

export default Products;

export const getServerSideProps: GetServerSideProps = async () => {
    const { data } = await getProductsBySort("createdAt", "desc");
    return {
        props: {
            products: data,
        },
    };
};
