// import { Suspense } from "react";
import { getProducts } from "@/api/products";

import ProductByCategory from "@/components/Oraganisms/Products/ProductByCategory";
// import Loading from "./loading";

const ProductByCategoryPage = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const productData = await getProducts({
        ["category.name"]: params?.slug,
        limit: 0,
    });
    const products = productData?.data?.data;

    return (
        <ProductByCategory
            title={`Product by ${params?.slug}`}
            products={products}
            name={params?.slug}
        />
    );
};

export default ProductByCategoryPage;
