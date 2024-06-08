import ProductByCategory from "@/components/Oraganisms/Products/ProductByCategory";
import { getProducts } from "@/api/products";

type ProductBySubCategoryParamType = {
    params: { slug: string };
};

export async function generateMetadata({
    params,
}: ProductBySubCategoryParamType) {
    return {
        title: `SubCategory-${params?.slug}`,
        description:
            "Explore a wide range of products curated under the subcategory of Aladin-E-Commerce. Find quality items and enjoy a seamless shopping experience.",
    };
}

const ProductBySubCategory: React.FC<ProductBySubCategoryParamType> = async ({
    params,
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
