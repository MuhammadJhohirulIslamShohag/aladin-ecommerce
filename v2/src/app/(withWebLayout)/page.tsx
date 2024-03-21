import Banner from "@/components/Home/Banner/Banner";
// import SubCategories from "@/components/Home/SubCategories/SubCategories";
// import Services from "@/components/Home/Services/Services";

// import Categories from "@/components/Home/Categories/Categories";
// import Advertise from "@/components/Home/Advertise/Advertise";
import Blogs from "@/components/Home/Blogs/Blogs";
import NewsLetter from "@/components/Home/NewsLetter/NewsLetter";
import Services from "@/components/Home/Services/Services";


const Home = () => {
    // const { products, loading } = useProductsFetch();
    return (
        <>
            <Banner /> 
            <NewsLetter />
            <Services />
            <Blogs />
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
