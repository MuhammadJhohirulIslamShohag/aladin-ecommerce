import WishlistProduct from "@/components/Oraganisms/Products/WishlistProducts";
import HeadSeo from "@/lib/seo/HeadSeo/HeadSeo";
import { getUserInfo } from "@/store/user/users";
import { getWishListProducts } from "@/store/wishList/wishList.product";

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
