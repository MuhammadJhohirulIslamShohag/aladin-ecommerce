import NewsLetter from "@/components/Home/NewsLetter/NewsLetter";

const Home = () => {
    return (
        <>
            {/* <Banner />
            <Services />
            <Categories />
            <SubCategories />
            <FlashDeals products={products} />
            <NewArrivals products={products} />
            <Advertise />
            <BestSellers products={products} />
            <Blogs /> */}
            <NewsLetter />
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
