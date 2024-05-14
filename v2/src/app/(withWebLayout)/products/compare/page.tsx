
import { getProducts } from "@/api/products";
import Loader from "@/components/Loader/Loader";
import CompareProducts from "@/components/Oraganisms/Products/CompareProducts";
import React, { Suspense } from "react";

const CompareProductsPage = async () => {
    const products = await getProducts({ limit: 0 });
    return (
        <Suspense fallback={<Loader height={"h-[360px]"} />}>
            <CompareProducts products={products?.data?.data} />;
        </Suspense>
    );
};

export default CompareProductsPage;
