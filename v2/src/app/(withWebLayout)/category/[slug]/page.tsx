import ProductByCategory from "@/components/Oraganisms/Products/ProductByCategory";
import { getProducts } from "@/api/products";

type ProductByCategoryParamType = {
    params: { slug: string };
};

export async function generateMetadata({ params }: ProductByCategoryParamType) {
    return {
        title: `${decodeURIComponent(params?.slug)}`,
        description:
            "Explore a wide range of products curated under the category of Aladin-E-Commerce. Find quality items and enjoy a seamless shopping experience.",
    };
}

const ProductByCategoryPage: React.FC<ProductByCategoryParamType> = async ({
    params,
}) => {
    const productData = await getProducts({
        ["category.name"]: `${decodeURIComponent(params?.slug)}`,
        limit: 0,
    });
    const products = productData?.data?.data;

    return (
        <ProductByCategory
            title={`Product by ${decodeURIComponent(params?.slug)}`}
            products={products}
            name={params?.slug}
        />
    );
};

export default ProductByCategoryPage;
