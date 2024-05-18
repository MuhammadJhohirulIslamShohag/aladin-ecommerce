import { Suspense } from "react";

import { getListOfBlogs } from "@/api/blog";
import { getCategories } from "@/api/category";
import { getProducts } from "@/api/products";
import { getAllSubCategories } from "@/api/sub-categories";

import Loader from "@/components/Molecules/Loader/Loader";
import Advertise from "@/components/Oraganisms/Advertise/Advertise";
import Blogs from "@/components/Oraganisms/Blogs";
import Categories from "@/components/Oraganisms/Categories";
import FlashDeals from "@/components/Oraganisms/Home/FlashDeals";
import FollowUsSocial from "@/components/Oraganisms/Home/FollowUsSocial";
import FunFactArea from "@/components/Oraganisms/Home/FunFactArea";
import Hero from "@/components/Oraganisms/Home/Hero";
import SmallProductSlider from "@/components/Oraganisms/Home/SmallProductSlider";
import FeaturedProducts from "@/components/Oraganisms/Products/FeaturedProducts";
import NewArrivals from "@/components/Oraganisms/Products/NewArrivals";
import TopProducts from "@/components/Oraganisms/Products/TopProducts";
import TopSellsProduct from "@/components/Oraganisms/Products/TopSellsProduct";
import Services from "@/components/Oraganisms/Services";
import SubCategories from "@/components/Oraganisms/SubCategories";

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
            <div className="container">
                <Suspense fallback={<Loader height={"h-[360px]"} />}>
                    <FeaturedProducts products={products?.data?.data} />
                </Suspense>

                <Suspense fallback={<Loader height={"h-[360px]"} />}>
                    <TopProducts products={products?.data?.data} />
                </Suspense>

                <Suspense fallback={<Loader height={"h-[360px]"} />}>
                    <NewArrivals products={products?.data?.data} />
                </Suspense>
                <Suspense fallback={<Loader height={"h-[360px]"} />}>
                    <SmallProductSlider
                        title="Best Food"
                        products={products?.data?.data}
                    />
                </Suspense>
            </div>

            <FunFactArea />

            <Suspense fallback={<Loader height={"h-[360px]"} />}>
                <TopSellsProduct products={products?.data?.data} />
            </Suspense>
            <Advertise />
            <Suspense fallback={<Loader height={"h-[450px]"} />}>
                <Blogs blogs={blogs?.data?.data} />
            </Suspense>
            <Suspense fallback={<Loader height={"h-[450px]"} />}>
                <FollowUsSocial products={products?.data?.data} />
            </Suspense>
        </>
    );
};

export default Home;
