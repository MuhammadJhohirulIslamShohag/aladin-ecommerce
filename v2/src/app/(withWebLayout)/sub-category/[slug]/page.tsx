

import ProductByCategory from "@/components/Oraganisms/Products/ProductByCategory";


import { getProducts } from "@/api/products";

const ProductBySubCategory = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const productData = await getProducts({
        ["subCategories.name"]: params?.slug,
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

export default ProductBySubCategory;
