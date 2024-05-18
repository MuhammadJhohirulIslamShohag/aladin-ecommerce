import { Suspense } from "react";
import Loader from "@/components/Molecules/Loader/Loader";
import CompareProducts from "@/components/Oraganisms/Products/CompareProducts";

import { getProducts } from "@/api/products";

const CompareProductsPage = async () => {
    const products = await getProducts({ limit: 0 });
    return (
        <Suspense fallback={<Loader height={"h-[360px]"} />}>
            <CompareProducts products={products?.data?.data} />;
        </Suspense>
    );
};

export default CompareProductsPage;
