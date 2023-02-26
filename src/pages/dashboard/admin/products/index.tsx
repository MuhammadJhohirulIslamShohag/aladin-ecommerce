import { getProductsBySort } from "@/api/products";
import ProductsTable from "@/components/Dashboard/Admin/ProductsTable/ProductsTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import React from "react";
import { IProduct } from "types/product.type";

const Products = ({ products }: { products: IProduct[] }) => {
    const router = useRouter();
  const refreshData = () => {
    router.replace(router.asPath);
  }
    return (
        <DashboardLayout>
            <div className="px-20 mt-5">
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
