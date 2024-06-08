import CardZoomCarousel from "@/components/Molecules/CardZoomCarousel";
import ProductDetailsTab from "@/components/Oraganisms/Products/Product/ProductDetailsTab";
import ProductInfo from "@/components/Oraganisms/Products/Product/ProductInfo/ProductInfo";
import RelatedProducts from "@/components/Oraganisms/Products/Product/RelatedProducts/RelatedProducts";

import { getProducts, getSingleProduct } from "@/api/products";
import { getReviews } from "@/api/review";

type ProductDetailsParamType = {
    params: { slug: string };
};

export async function generateMetadata({ params }: ProductDetailsParamType) {
    const productResponse = await getSingleProduct(params?.slug);
    const product = productResponse?.data?.data;

    return {
        title: `${product?.name}`,
        description:
            "Discover more about this product on Aladin-E-Commerce Online Shopping Platform. Explore its features, specifications, and reviews to make an informed purchase decision.",
    };
}

const ProductDetails: React.FC<ProductDetailsParamType> = async ({
    params,
}) => {
    const productsData = getSingleProduct(params?.slug);

    // Wait for the promises to resolve
    const [product] = await Promise.all([productsData]);

    const { name, imageURLs, _id, category } = product?.data?.data;

    const relatedProductData = await getProducts({
        ["category.name"]: category?.name,
        limit: 3,
    });

    const reviewProductsData = await getReviews({
        productId: _id,
    });

    const relatedProduct = relatedProductData?.data?.data;

    return (
        <div className="bg-white container lg:mt-10 md:mt-5 mt-5 lg:mb-36 md:mb-20 mb-10 lg:pb-16 md:pb-10 pb-8">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 md:gap-4 pt-6">
                <div className="z-10">
                    {product && name && imageURLs && imageURLs.length ? (
                        <CardZoomCarousel images={imageURLs} title={name} />
                    ) : (
                        <h2>No Image On The Product</h2>
                    )}
                </div>

                <div className="mx-auto max-w-7xl relative mt-6">
                    <ProductInfo
                        product={product?.data?.data}
                        reviewProducts={reviewProductsData?.data?.data}
                    />
                </div>
            </div>

            <div className="mt-10">
                <ProductDetailsTab
                    product={product?.data?.data}
                    reviewProducts={reviewProductsData?.data?.data}
                />
            </div>

            <RelatedProducts products={relatedProduct} />
        </div>
    );
};

export default ProductDetails;
