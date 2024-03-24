"use client";

import { useOptimistic, startTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import _ from "lodash";
import { FaShoppingCart } from "react-icons/fa";
import { MdPageview } from "react-icons/md";
import { AvgRating } from "@/lib/utils/avgRating";
import { IProduct } from "@/types/product.type";
import { getCarts, storeCart } from "@/store/cart/cart";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";

const Product = ({ product }: { product: IProduct }) => {
    let allCart = getCarts();

    const {
        dispatch
    } = useStoreContext();

    const [isAddToCartOptimistic, setIsAddToCartOptimistic] = useOptimistic(
        allCart,
        (state, newState) => {
            return [...state, newState];
        }
    );

    const { _id, slug, name, imageURLs, description, price, discount } =
        product;

    const handleAddCart = () => {
        // create cart array
        let carts = getCarts();

        // added cart
        carts.push({
            ...product,
            price: price - (price * discount) / 100,
            count: 1,
        });
        // remove duplicates
        const uniqueCarts = _.uniqWith(carts, _.isEqual);

        // set cart object in windows localStorage
        startTransition(() => {
            storeCart(JSON.stringify(uniqueCarts));
            setIsAddToCartOptimistic(uniqueCarts);

            // added cart in store context
            dispatch({
                type: StoreActionType.ADD_TO_CART,
                payload: uniqueCarts,
            });
        });
    };

    const isAddToCart = isAddToCartOptimistic.filter(
        (cart: any) => cart._id === _id
    );

    return (
        <div className="rounded-lg shadow-md group cursor-pointer">
            <div className="h-72 relative">
                <div className="absolute top-3 rounded-full left-3 w-14 h-14 bg-success flex justify-center items-center flex-col">
                    <span className="text-white -mb-2">Off</span>
                    <span className="flex justify-center items-center text-white">
                        {product?.discount ? product?.discount : "0"}%
                    </span>
                </div>
                <ul className="transition duration-300 ease-in-out invisible flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group-hover:visible">
                    <li
                        className={`py-3 flex items-center px-3 rounded-lg ml-2 border-2  hover:bg-primary hover:border-primary hover:text-white  text-white ${
                            isAddToCart?.length > 0
                                ? "bg-primary border-primary"
                                : "bg-success border-success"
                        }  transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                        title={
                            isAddToCart?.length > 0
                                ? "Already To Cart"
                                : "Add To Cart"
                        }
                        onClick={() => handleAddCart()}
                    >
                        <FaShoppingCart />
                    </li>

                    <label htmlFor="my-modal-3">
                        <Link href={`/products/${slug}`}>
                            <li
                                className={`py-3 flex items-center px-3 rounded-lg ml-2 border-2 border-success hover:bg-primary hover:border-primary hover:text-white  text-white bg-success transition ease-in-out delay-15 cursor-pointer tooltip tooltip-primary`}
                                data-tip={"Details Product"}
                            >
                                <MdPageview fill="#fff" />
                            </li>
                        </Link>
                    </label>
                </ul>
                <Image
                    className="h-full w-full"
                    src={`${imageURLs && imageURLs.length && imageURLs[0]}`}
                    alt={name}
                    width={100}
                    height={100}
                />
            </div>
            <div className="p-5">
                {/* <AvgRating product={product} isHomeReviewShow /> */}
                <h5 className="my-2 text-xl font-semibold tracking-tight text-gray-800">
                    {name}
                </h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {description.length > 90
                        ? `${description.slice(0, 90)} ...`
                        : description}
                </p>
                <div className="flex items-center gap-2 top-2 mb-1">
                    <span className="font-bold text-gray-700">
                        USD {(price - (price * discount) / 100).toFixed(2)} $
                    </span>
                    <span className="font-bold line-through text-sm text-gray-600">
                        - USD {price.toFixed(2)} $
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Product;
