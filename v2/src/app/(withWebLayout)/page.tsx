import { getListOfBlogs } from "@/api/blog";
import { Suspense } from "react";
import { getCategories } from "@/api/category";
import { getProducts } from "@/api/products";
import { getAllSubCategories } from "@/api/sub-categories";
import Advertise from "@/components/Home/Advertise/Advertise";
import BestSellers from "@/components/Home/BestSellers/BestSellers";
import Blogs from "@/components/Home/Blogs/Blogs";
import Categories from "@/components/Home/Categories/Categories";
import NewsLetter from "@/components/Home/NewsLetter/NewsLetter";
import Services from "@/components/Home/Services/Services";
import SubCategories from "@/components/Home/SubCategories/SubCategories";
import Loader from "@/components/Loader/Loader";
import FlashDeals from "@/components/Home/FlashDeals/FlashDeals/FlashDeals";
import NewArrivals from "@/components/Home/NewArrivals/NewArrivals";
import Hero from "@/components/Oraganisms/Home/Hero";

const Home = async () => {
    // Initiate both requests in parallel
    const blogsData = getListOfBlogs({ limit: 3 });
    const productsData = getProducts({ limit: 0 });
    const categoriesData = getCategories({ limit: 4 });
    const subCategoriesData = getAllSubCategories({ limit: 4 });

    // Wait for the promises to resolve
    const [products, blogs, categories, subCategories] = await Promise.all([
        productsData,
        blogsData,
        categoriesData,
        subCategoriesData,
    ]);

    return (
        <>
            <Suspense fallback={<Loader height={"h-[360px]"} />}>
                <Hero products={products.data?.data} />
            </Suspense>

            <Services />

            <Suspense fallback={<Loader height={"h-[360px]"} />}>
                <Categories data={categories.data?.data} />
            </Suspense>

            <Suspense fallback={<Loader height={"h-[360px]"} />}>
                <SubCategories data={subCategories.data?.data} />
            </Suspense>

            <Suspense fallback={<Loader height={"h-[360px]"} />}>
                <FlashDeals products={products?.data?.data} />
            </Suspense>

            <Suspense fallback={<Loader height={"h-[360px]"} />}>
                <BestSellers products={products?.data?.data} />
            </Suspense>

            <Suspense fallback={<Loader height={"h-[360px]"} />}>
                <NewArrivals products={products?.data?.data} />
            </Suspense>

            <Suspense fallback={<Loader height={"h-[450px]"} />}>
                <Blogs blogs={blogs?.data?.data} />
            </Suspense>

            <Advertise />
            {/* <NewsLetter /> */}
        </>
    );
};

export default Home;

// export const getServerSideProps: GetServerSideProps = async () => {
//     const { data } = await getProductsBySort("createdAt", "desc");
//     const { data: bestSellerProductData } = await getProductsBySort(
//         "sold",
//         "desc"
//     );
//     const { data: flashDealsProductData } = await getProductsBySort(
//         "discount",
//         "desc"
//     );
//     const { data: categoriesData } = await getListOfCategory();
//     const { data: subCategoriesData } = await getAllSubCategories();
//     const { data: blogsData } = await getListOfBlogs();
//     return {
//         props: {
//             products: data,
//             bestSellerProducts: bestSellerProductData,
//             flashDealsProducts: flashDealsProductData,
//             subCategories: subCategoriesData,
//             categories: categoriesData,
//             blogs: blogsData,
//         },
//     };
// };
