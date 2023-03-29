import { useEffect } from 'react';
import AOS from "aos";
import Banner from "@/components/Home/Banner/Banner";
import BestSellers from "@/components/Home/BestSellers/BestSellers";
import SubCategories from "@/components/Home/SubCategories/SubCategories";
import NewArrivals from "@/components/Home/NewArrivals/NewArrivals";
import Services from "@/components/Home/Services/Services";
import MainLayout from "@/layouts/MainLayout/MainLayout";
import Categories from "@/components/Home/Categories/Categories";
import FlashDeals from "@/components/Home/FlashDeals/FlashDeals/FlashDeals";
import Advertise from "@/components/Home/Advertise/Advertise";
import Blogs from "@/components/Home/Blogs/Blogs";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import Preloader from '@/components/UI/Preloader/Preloader';
import NewsLetter from '@/components/Home/NewsLetter/NewsLetter';
import useProductsFetch from '@/hooks/useProductsFetch';


const Home = () => {
    const { products, loading } = useProductsFetch();
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    return (
        <>
            <HeadSeo
                title="Aladin"
                content="Aladin Industries Ltd. Providing reliable products since 2022"
            />
            {loading ? (
                <Preloader />
            ) : (
                <>
                    <MainLayout>
                        <Banner />
                        <Services />
                        <Categories />
                        <SubCategories />
                        <FlashDeals products={products} />
                        <NewArrivals products={products} />
                        <Advertise />
                        <BestSellers products={products} />
                        <Blogs />
                        <NewsLetter />
                    </MainLayout>
                </>
            )}

        </>
    );
}

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
