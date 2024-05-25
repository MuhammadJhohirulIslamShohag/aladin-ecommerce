import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { getSingleCategory } from "@/api/category";
import { getProducts } from "@/api/products";

import ProductByCategory from "@/components/Oraganisms/Products/ProductByCategory";

const ProductByCategoryPage = async ({
    params,
}: {
    params: { slug: string };
}) => {
    const productData = await getProducts({
        ["category.name"]: params?.slug,
        limit: 0,
    }.toString());
    const products = productData?.data?.data;

    console.log(products, "products", params, "params")

    return (
        <>
            <HeadSeo
                title={category?.name}
                content={`Product by ${params?.slug}`}
            />
            <ProductByCategory
                title={`Product by ${params?.slug}`}
                products={products}
            />
        </>
    );
};

export default ProductByCategoryPage;
