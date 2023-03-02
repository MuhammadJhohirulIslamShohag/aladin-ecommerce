/* eslint-disable react-hooks/exhaustive-deps */
import { getWishLists, removeWishList } from "@/api/user";
import WishlistProduct from "@/components/Product/WishlistProduct/WishlistProduct";
import SectionTitle from "@/components/SectionTitle/SectionTitle";
import Skeleton from "@/components/Skeleton/Skeleton";
import UserDashboard from "@/layouts/DashboardLayout/UserDashboard";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";

const UserWishlist = () => {
    const [wishLists, setWishList] = useState([]);
    const [loading, setLoading] = useState(false);
    const { state } = useStoreContext();
    const { user } = state;
    console.log(user)

    useEffect(() => {
        loadingWishList();
    }, []);

    // loading all wishlist
    const loadingWishList = () => {
        if (user && user.token) {
            setLoading(true);
            getWishLists(user.token)
                .then((res) => {
                    setWishList(res.data.wishList);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                });
        }
    };

    const handleRemovedToWishList = (_id: string) => {
        if (user && user.token) {
            removeWishList(user.token, _id).then((res) => {
                toast.error("Wish List is Removed!");
                loadingWishList();
            });
        }
    };

    return (
        <UserDashboard>
            <div className="container mt-10">
                <SectionTitle title="Wish List" />
                {loading ? (
                    <div className="grid mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        <Skeleton numbers={3} />
                    </div>
                ) : wishLists && wishLists.length < 1 ? (
                    <p className="text-center text-xl text-primary">
                        No Wish List Product Found By {user?.fullName}
                    </p>
                ) : (
                    <div className="grid  mt-5 gap-5 grid-cols-3 md:grid-cols-2 sm:grid-cols-1">
                        {wishLists &&
                            wishLists.length &&
                            wishLists.map((product: any) => (
                                <div key={product._id}>
                                    <WishlistProduct
                                        product={product.product}
                                        handleRemovedToWishList={
                                            handleRemovedToWishList
                                        }
                                        isUserWishList
                                    />
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </UserDashboard>
    );
};

export default UserWishlist;
