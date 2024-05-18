import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import ProductCard from "@/components/Molecules/Products/ProductCard";
import SectionTitle from "@/components/Molecules/SectionTitle";

import { IProduct } from "@/types/product.type";
import { getSingleCategory } from "@/api/category";
import { getProducts } from "@/api/products";

const ProductByCategory = async ({ params }: { params: { slug: string } }) => {
    const categoryData = await getSingleCategory(params?.slug);
    const category = categoryData?.data?.data;

    const productData = await getProducts({
        ["category.categoryId"]: category?._id,
        limit: 0,
    });
    const products = productData?.data?.data;

    return (
        <>
            <HeadSeo
                title={category?.name}
                content={`Product by ${category?.name}`}
            />

            <div className="container mx-auto px-6 mt-10">
                <SectionTitle title={"Wishlist Products"} />

                {products && products?.length < 1 ? (
                    <div className="h-80 flex items-center justify-center">
                        <p className="text-center text-xl text-primary">
                            No Product Found By The {category.name}
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-8 gap-4 px-2 lg:px-0">
                        {products?.map((product: IProduct) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default ProductByCategory;
