import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

import { getProducts } from "@/api/products";
import ProductByCategory from "@/components/Oraganisms/Products/ProductByCategory";

const ProductBySubCategory = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const productData = await getProducts({
        ["subCategories.name"]: params?.slug,
        limit: 0,
    }.toString());
    const products = productData?.data?.data;

    return (
        <>
            <HeadSeo
                title={params?.slug}
                content={`Product by ${params?.slug}`}
            />

            <ProductByCategory
                title={`Product by ${params?.slug}`}
                products={products}
                name={params?.slug}
            />
        </>
    );
};

export default ProductBySubCategory;
