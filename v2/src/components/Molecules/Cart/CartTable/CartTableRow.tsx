import React, { useState, useEffect, useCallback } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import toast from "react-hot-toast";
import Image from "next/image";

import AddCountCart from "../../AddCountCart";

import { CartType } from "@/types/cart.types";
import { useStoreContext } from "@/contexts/StoreContextProvider";
import { StoreActionType } from "@/contexts/storeReducer/storeReducer.type";
import { getCarts, storeCart } from "@/store/cart/cart";

interface CartTableRowProps {
    product: CartType;
}

const CartTableRow: React.FC<CartTableRowProps> = ({ product }) => {
    const [quantity, setQuantity] = useState(product?.count);

    const { imageURLs, name, price, quantity: productQuantity } = product;
    const { dispatch } = useStoreContext();

    const handleQuantityChange = useCallback(() => {
        let count = quantity < 1 ? 1 : quantity;

        // checking available product
        if (count > productQuantity) {
            toast.error(`Max available ${productQuantity} products`);
            return;
        }
        let carts = getCarts();

        for (let i = 0; i < carts.length; i++) {
            if (carts[i]._id === product._id) {
                carts[i].count = quantity;
            }
        }

        // changing count value store local storage
        storeCart(JSON.stringify(carts));
        // store data into redux
        dispatch({
            type: StoreActionType.ADD_TO_CART,
            payload: carts,
        });
    }, [quantity, dispatch, productQuantity, product._id]);

    useEffect(() => {
        handleQuantityChange();
    }, [quantity, handleQuantityChange]);

    const removeCartHandler = () => {
        let carts = getCarts();

        // delete carts
        for (let i = 0; i < carts.length; i++) {
            if (carts[i]._id === product._id) {
                carts.splice(i, 1);
            }
        }
        // set undeleted carts into the window local storage
        storeCart(JSON.stringify(carts));
        // store redux
        dispatch({
            type: StoreActionType.ADD_TO_CART,
            payload: carts,
        });
    };

    /* Handle product quantity increment here */
    const handleIncrement = () => {
        if (quantity < productQuantity) {
            setQuantity(quantity + 1);
        } else {
            toast.error("You can not order more than quantity");
        }
    };

    /* Handle product quantity decrement here */
    const handleDecrement = () => {
        // handle decrement
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } else {
            toast.error("You can not order less than 1 product ");
        }
    };

    return (
        <tr className="bg-white border-b">
            <td className="px-6 py-4 font-semibold text-gray-900 ">
                <div
                    className="min-w-max flex"
                    style={{ width: "100px", height: "auto" }}
                >
                    {product && imageURLs && imageURLs.length ? (
                        <Image
                            src={imageURLs?.[0]}
                            alt={name}
                            className="w-10 h-10 rounded-full"
                            width={100}
                            height={80}
                        />
                    ) : (
                        <Image
                            src={"/docs/images/people/profile-picture-3.jpg"}
                            alt={name}
                            className="w-10 h-10 rounded-full"
                            width={100}
                            height={80}
                        />
                    )}
                </div>
            </td>
            <td className="text-center px-6 py-4 font-semibold text-gray-900 ">
                <span className="min-w-max flex">{name}</span>
            </td>
            <td className="text-center px-6 py-4 font-semibold text-gray-900 ">
                ${price}
            </td>

            <td className="text-center px-6 py-4 font-semibold text-gray-900 ">
                <AddCountCart
                    handleDecrement={handleDecrement}
                    handleIncrement={handleIncrement}
                    isForAddCart={false}
                    quantity={quantity}
                />
            </td>

            <td
                className="text-center cursor-pointer"
                onClick={removeCartHandler}
            >
                <AiOutlineCloseCircle className="text-red-600 inline-block" />
            </td>
        </tr>
    );
};

export default CartTableRow;
