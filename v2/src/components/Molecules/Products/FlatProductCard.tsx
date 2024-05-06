"use client";

import Link from "next/link";
import React, { useState } from "react";
import { BsFillCartPlusFill } from "react-icons/bs";
import { FaHeartBroken, FaSearch } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";

import CustomModal from "../../Atoms/Modal/CustomModal";
import SaveProductModal from "../../Molecules/Modal/SaveProductModal";
import CompareProductInfo from "../../Molecules/Products/CompareProductInfo";
import ProductCartPreview from "./ProductCartPreview";
import ProductView from "./ProductView";

// import { useDispatch } from "react-redux";
// import useAuthData from "../../../hooks/useAuthData";
import numberWithCommas from "@/utils/numberWithCommas";
import Division from "../../Atoms/Division";
import ValidateImage from "../../Atoms/ValidateImage";
import { IProduct } from "@/types/product.type";

const FlatProductCard: React.FC<{ product: IProduct }> = ({ product }) => {
    //   const [addWishList] = useAddWishlistMutation();
    //   const dispatch = useDispatch();
    const { name, price, discount, imageURLs } = product;

    const discountPrice = Math.ceil(price * (discount / 100));
    const netPrice = Math.ceil(price - discountPrice);

    //   const { user, token } = useAuthData();
    //   const { data, isLoading, refetch } = useGetSingleUserQuery({
    //     id: user?._id,
    //   });

    //   const userWishLists = data?.data?.wishList || [];
    //   const wishListProduct = userWishLists.find(
    //     (wishList) => wishList?.productId?._id === product?._id
    //   );

    const [modalOpen, setModalOpen] = useState(false);
    const [productView, setProductView] = useState(false);
    const [saveProductModalOpen, setSaveProductModalOpen] = useState(false);
    const [compareModalOpen, setCompareModalOpen] = useState(false);

    const manageWishListProduct = async (id: string) => {
        // await addWishList(id).then((res) => {
        //   if (res?.data?.success) {
        //     toast.success(res?.data?.message, {
        //       duration: 5000,
        //     });
        //     refetch();
        //   } else {
        //     toast.error(res?.error?.data?.errorMessages?.[0]?.message, {
        //       duration: 5000,
        //     });
        //   }
        // });
    };

    const handleAddCart = () => {
        setModalOpen((prevState) => !prevState);
    };

    const makeProductTitle = (name: string) => {
        const removeSpace = name?.replace(/\s/g, "_");
        return removeSpace;
    };

    const title = makeProductTitle(name);

    return (
        <>
            <div className="relative group w-full transition xl:py-5 py-7  mx-auto rounded-md bg-white shadow  grid xl:grid-cols-2 grid-cols-1">
                <div className=" px-5">
                    <div className="relative hover:scale-110 duration-500">
                        <Link href={`/product/${name}`}>
                            <ValidateImage
                                imageUrl={
                                    imageURLs?.[0] ||
                                    "https://cdn.thewirecutter.com/wp-content/media/2023/06/businesslaptops-2048px-0943.jpg"
                                }
                                className="mx-auto transition-all duration-500 max-w-[250px] xl:max-h-[143px] max-h-full"
                                alt={name}
                            />
                        </Link>
                    </div>
                </div>
                <div className="relative flex flex-col justify-between ">
                    <Link
                        className="text-secondary mt-2 mb-5"
                        href="/product/sample-properties-4?pd=66208b55469a7458ab60f8f3"
                    >
                        <h3 className="font-bold mb-[4px] hover:text-primary duration-300 hover:underline px-5">
                            {name?.length && name?.length > 35
                                ? name.slice(0, 35) + "..."
                                : name}
                        </h3>
                        <div className="px-5">
                            <div className="flex gap-3">
                                <span className="text-primary">
                                    ৳ {numberWithCommas(netPrice)}
                                </span>
                                <span className="line-through">
                                    ৳ {numberWithCommas(price)}
                                </span>
                            </div>
                        </div>
                    </Link>

                    <div className="flex xl:justify-start justify-center">
                        <div className="flex gap-2 flex-wrap">
                            <Division
                                className="p-2 hidden lg:block rounded-full shadow-md hover:bg-primary group/edit duration-300 transition cursor-pointer  bg-white text-textPrimary"
                                onClick={() => handleAddCart()}
                            >
                                <BsFillCartPlusFill className="text-2xl" />
                            </Division>
                            <Division
                                className="px-2 rounded-full shadow-md hover:bg-primary group/edit duration-300 transition cursor-pointer  bg-white text-textPrimary flex items-center justify-center"
                                onClick={() =>
                                    manageWishListProduct(product?._id)
                                }
                            >
                                <FaHeartBroken className={`text-2xl `} />
                            </Division>
                            <Division
                                className="px-3 rounded-full shadow-md hover:bg-primary group/edit duration-300 transition cursor-pointer  bg-white text-textPrimary flex items-center justify-center"
                                onClick={() => setProductView(!productView)}
                            >
                                <FaSearch className="text-md" />
                            </Division>
                            <Division
                                className="px-2 rounded-full shadow-md hover:bg-primary group/edit duration-300 transition cursor-pointer  bg-white text-textPrimary flex items-center justify-center"
                                onClick={() => {
                                    setCompareModalOpen((prev) => !prev);
                                    // dispatch(addToCompare({ ...product }));
                                }}
                            >
                                <MdCompareArrows className="text-2xl" />
                            </Division>
                        </div>
                    </div>
                </div>
            </div>

            {productView && (
                <CustomModal onClose={() => setProductView((prev) => !prev)}>
                    <ProductView
                        product={product}
                        setProductView={setProductView}
                    />
                </CustomModal>
            )}
            {saveProductModalOpen && (
                <CustomModal
                    onClose={() => setSaveProductModalOpen((prev) => !prev)}
                >
                    <SaveProductModal
                        onCloseSaveProductModal={setSaveProductModalOpen}
                        product={product}
                        isProductExist={false}
                        // isProductExist={wishListProduct}
                    />
                </CustomModal>
            )}
            {modalOpen && (
                <CustomModal onClose={() => setModalOpen((prev) => !prev)}>
                    <ProductCartPreview
                        product={product}
                        handleClose={() => setModalOpen((prev) => !prev)}
                    />
                </CustomModal>
            )}
            {compareModalOpen && (
                <CustomModal
                    onClose={() => setCompareModalOpen((prev) => !prev)}
                >
                    <CompareProductInfo
                        onCloseCompareModal={() =>
                            setCompareModalOpen((prev) => !prev)
                        }
                        compareProductName={product?.name}
                    />
                </CustomModal>
            )}
        </>
    );
};

export default FlatProductCard;
