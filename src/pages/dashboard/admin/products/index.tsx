import { getProductsBySort } from "@/api/products";
import ProductsTable from "@/components/Dashboard/Admin/ProductsTable/ProductsTable";
import DashboardLayout from "@/layouts/DashboardLayout/DashboardLayout";
import { GetServerSideProps } from "next";
import React from "react";
import { IProduct } from "types/product.type";

const Products = ({ products }: { products: IProduct[] }) => {
    return (
        <DashboardLayout>
            <div className="px-20 mt-5">
                <ProductsTable data={products} />
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
