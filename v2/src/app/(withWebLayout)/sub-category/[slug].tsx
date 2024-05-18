
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import ProductCard from "@/components/Molecules/Products/ProductCard";

import { IProduct } from "@/types/product.type";
import { getProducts } from "@/api/products";
import { getSubCategory } from "@/api/sub-categories";
import SectionTitle from "@/components/Molecules/SectionTitle";

const ProductBySubCategory = async ({ params }: { params: { slug: string } }) => {
    const subCategoryData = await getSubCategory(params?.slug);
    const subCategory = subCategoryData?.data?.data;

    const productData = await getProducts({
        ["category.categoryId"]: subCategory?._id,
        limit: 0,
    });
    const products = productData?.data?.data;

    return (
        <>
            <HeadSeo
                title={subCategory?.name}
                content={`Product by ${subCategory?.name}`}
            />

            <div className="container mx-auto px-6 mt-10">
                <SectionTitle title={"Wishlist Products"} />

                {products && products?.length < 1 ? (
                    <div className="h-80 flex items-center justify-center">
                        <p className="text-center text-xl text-primary">
                            No Product Found By The {subCategory.name}
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

export default ProductBySubCategory;
