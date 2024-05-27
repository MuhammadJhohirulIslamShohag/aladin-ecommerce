"use client";

import { RadioGroup } from "@headlessui/react";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { startTransition, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { BsFillHeartFill, BsHandbagFill } from "react-icons/bs";

import CustomButton from "@/components/Molecules/Button/CustomButton/CustomButton";
import ProductDescriptionItem from "../../../../Molecules/Products/Product/ProductDescription/ProductDescriptionItem";
import AvgRating from "../../../../Molecules/Products/AvgRating";

import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { getCarts, storeCart } from "@/store/cart/cart";
import { getUserInfo } from "@/store/user/users";
import { CartType } from "@/types/cart.types";
import { IColor } from "@/types/color.types";
import { IProduct } from "@/types/product.type";
import { IReview } from "@/types/review.types";
import {
    useAddWishlistMutation,
    useRemoveWishListMutation,
} from "@/redux/services/wishlist/wishListApiService";
import { useGetSingleUserQuery } from "@/redux/services/user/userApiService";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const ProductInfo = ({
    product,
    reviewProducts,
}: {
    product: IProduct;
    reviewProducts: IReview[];
}) => {
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [heartFillIcon, setHeartFillIcon] = useState<boolean>(false);

    const user = getUserInfo();
    const router = useRouter();

    const {
        name,
        price,
        category,
        discount,
        shipping,
        brand,
        subCategories,
        slug,
        _id,
    } = product;

    const { state, dispatch } = useStoreContext();

    const { data: userInfo } = useGetSingleUserQuery(user?.user?._id);
    const [addWishlist] = useAddWishlistMutation();
    const [removeWishList] = useRemoveWishListMutation();

    const existingWishList = userInfo?.data?.data?.wishLists.find(
        (wishList: { productId: string }) => wishList.productId === _id
    );

    const isAddToCart = state?.carts?.filter(
        (cart: CartType) => cart._id === _id
    );

    useEffect(() => {
        if (existingWishList) {
            setHeartFillIcon(true)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleAddCart = () => {
        if (isAddToCart?.length <= 0) {
            let carts = getCarts();
            if (selectedColor === "") {
                return toast.error("Select The Color");
            }
            if (selectedSize === "") {
                return toast.error("Select The Size");
            }

            // push carts into carts array
            carts.push({
                ...product,
                count: 1,
                price:
                    product?.price - (product?.price * product?.discount) / 100,
                color: selectedColor,
                size: selectedSize,
            });

            // remove duplicates value
            const uniqueCarts = _.uniqWith(carts, _.isEqual);

            // set cart object in windows local storage
            startTransition(() => {
                storeCart(JSON.stringify(uniqueCarts));

                // added cart in store context
                dispatch({
                    type: StoreActionType.ADD_TO_CART,
                    payload: uniqueCarts,
                });
            });
            toast.success("Product Added To The Carts");
        } else {
            toast.error("Product Already Added To The Cart");
        }
    };

    const handleAddToWishList = () => {
        if (user && user?.token) {
            if (heartFillIcon) {
                removeWishList(_id).then((res) => {
                    if ("data" in res && res.data && res.data?.success) {
                        setHeartFillIcon(false);
                        toast.error("Product Removed To The WishList");
                    }
                });
            } else {
                addWishlist(_id).then((res) => {
                    if ("data" in res && res.data && res.data?.success) {
                        setHeartFillIcon(true);
                        toast.success("Product Added To The WishList");
                    }
                });
            }
        } else {
            router.push(`/auth/login?redirect=/products/${slug}`);
        }
    };

    return (
        <>
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl break-all">
                    {name}
                </h1>
            </div>
            {/* Reviews */}
            <AvgRating product={reviewProducts} />
            {/* Options */}
            <div className="mt-4">
                <div>
                    <span className="text-3xl tracking-tight text-black font-semibold">
                        ${price - (price * discount) / 100}
                    </span>
                    <span className="text-2xl ml-4 line-through tracking-tight text-rose-500">
                        ${price}
                    </span>
                </div>

                <div className="mt-5">
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Brand"
                        value={brand?.name}
                    />
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Category"
                        value={category?.name}
                    />
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Sub Category"
                        value={subCategories}
                    />
                </div>

                <form className="mt-5">
                    {/* Colors */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">
                            Choose Color
                        </h3>

                        <RadioGroup
                            value={selectedColor}
                            onChange={(v: string) => setSelectedColor(v)}
                            className="mt-4"
                        >
                            <div className="flex items-center space-x-3">
                                {product?.colors?.map((color: IColor) => (
                                    <RadioGroup.Option
                                        key={color._id}
                                        value={color.name}
                                        className={({ active, checked }) =>
                                            classNames(
                                                active && checked
                                                    ? "ring ring-green-300 ring-offset-green-300"
                                                    : "",
                                                !active && checked
                                                    ? "ring-2 ring-green-300 ring-offset-green-300"
                                                    : "",
                                                `-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none`
                                            )
                                        }
                                    >
                                        <span
                                            className={`${
                                                color.name === "Red"
                                                    ? "bg-red-600"
                                                    : color.name === "Green"
                                                    ? `bg-success`
                                                    : color.name === "Orange"
                                                    ? `bg-warning`
                                                    : `bg-${color.name.toLowerCase()}-600`
                                            } h-8 w-8 border border-black border-opacity-10 rounded-full`}
                                        />
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Sizes */}
                    <div className="mt-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                                Choose Size
                            </h3>
                        </div>

                        <RadioGroup
                            value={selectedSize}
                            onChange={(v: string) => setSelectedSize(v)}
                            className="mt-4"
                        >
                            <div className="grid grid-cols-4 gap-4 sm:grid-cols-2 md:grid-cols-3">
                                {product?.sizes?.map((size: any) => (
                                    <RadioGroup.Option
                                        key={size._id}
                                        value={size.name}
                                        className={({ active }) =>
                                            classNames(
                                                "bg-white shadow-sm text-gray-900 cursor-pointer",
                                                active
                                                    ? "ring-2 ring-green-500"
                                                    : "",
                                                "group relative border rounded-md py-3 sm:py-2  px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1"
                                            )
                                        }
                                    >
                                        {({ active, checked }) => (
                                            <>
                                                <RadioGroup.Label as="span">
                                                    {size.name}
                                                </RadioGroup.Label>

                                                <span
                                                    className={classNames(
                                                        active
                                                            ? "border"
                                                            : "border-2",
                                                        checked
                                                            ? "border-green-500"
                                                            : "border-transparent",
                                                        "pointer-events-none absolute -inset-px rounded-md"
                                                    )}
                                                    aria-hidden="true"
                                                />
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-4">
                        <CustomButton
                            buttonType="button"
                            className="lg:mt-10 md:mt-10 mt-5 w-full"
                            handleClick={handleAddCart}
                        >
                            <BsHandbagFill className="mr-1" />
                            <span>
                                {" "}
                                {isAddToCart?.length > 0
                                    ? "Added To Cart"
                                    : "Add To Cart"}
                            </span>
                        </CustomButton>
                        {existingWishList ? (
                            <CustomButton
                                buttonType="button"
                                className="lg:mt-10 md:mt-10 mt-0 w-full"
                                handleClick={handleAddToWishList}
                            >
                                <BsFillHeartFill className="mr-1" />
                                <span>Removed To Wishlist</span>
                            </CustomButton>
                        ) : (
                            <CustomButton
                                buttonType="button"
                                className="lg:mt-10 md:mt-10 mt-0 w-full"
                                handleClick={handleAddToWishList}
                            >
                                <BsFillHeartFill className="mr-1" />
                                <span>Add To WishList</span>
                            </CustomButton>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductInfo;
