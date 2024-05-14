import WishlistProduct from "@/components/Oraganisms/Products/WishlistProducts";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";

const WishLists = () => {
    return (
        <>
            <HeadSeo
                title={"wish list"}
                content={`Product`}
            />

            <WishlistProduct />
        </>
    );
};

export default WishLists;
