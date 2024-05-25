import CardZoomCarousel from "@/components/Molecules/CardZoomCarousel";
import ProductInfo from "@/components/Oraganisms/Products/Product/ProductInfo/ProductInfo";
import ProductDetailsTab from "@/components/Oraganisms/Products/Product/ProductDetailsTab";
import SectionTitle from "@/components/Molecules/SectionTitle";
import RelatedProduct from "@/components/Oraganisms/Products/RelatedProduct";

import { getSingleProduct, getProducts } from "@/api/products";
import { getReviews } from "@/api/review";

const ProductDetails = async ({ params }: { params: { slug: string } }) => {
    const productsData = getSingleProduct(params.slug);

    // Wait for the promises to resolve
    const [product] = await Promise.all([productsData]);

    const { name, imageURLs, _id, slug, category } = product?.data?.data;

    const relatedProductData = await getProducts({
        ["category.name"]: category?.name,
        limit: 3,
    });

    const reviewProductsData = await getReviews({
        productId: _id,
    });

    const relatedProduct = relatedProductData?.data?.data;

    let content = null;

    if (relatedProduct.length) {
        content = (
            <RelatedProduct
                products={relatedProduct}
                className="grid mt-5 gap-5 lg:grid-cols-5 md:grid-cols-2 grid-cols-1"
            />
        );
    }

    if (!relatedProduct.length) {
        content = <h1>No Product Found By The {name}</h1>;
    }

    return (
        <>
            <div className="bg-white container mt-10 md:mt-5 sm:mt-5">
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

                <section className="mt-10">
                    <SectionTitle title="Related Products" />
                    <div>{content}</div>
                </section>
            </div>
        </>
    );
};

export default ProductDetails;
