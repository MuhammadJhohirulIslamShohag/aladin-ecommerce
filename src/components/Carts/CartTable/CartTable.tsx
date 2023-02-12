/* eslint-disable react-hooks/exhaustive-deps */
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import React, { useState, useEffect } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FaRegCheckCircle } from "react-icons/fa";
import Image from "next/image";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import toast from "react-hot-toast";
const colorArray = ["Green", "Black", "Red", "White"];
const CartTable = ({ product }: any) => {
    const [countNumber, setCountNumber] = useState(product.count);
    const { images, title, shipping, color, brand, price, quantity } = product;
    const { dispatch } = useStoreContext();


    useEffect(() => {
        handleQuantityChange();
    }, [countNumber]);

    const handleColorChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
        let carts = [];
        if (typeof window !== "undefined") {
            // checking already carts to the window localStorage
            let cartsFromLocalStorage: string | null =
                window.localStorage.getItem("carts");
            if (cartsFromLocalStorage !== null) {
                carts = JSON.parse(cartsFromLocalStorage);
            }
            // carts.map((product, i) => {
            //     if (product._id === p._id) {
            //       cart[i].color = e.target.value;
            //     }
            //   });
            // updating cart color
            for (let i = 0; i < carts.length; i++) {
                if (carts[i]._id === product._id) {
                    carts[i].color = e.target.value;
                }
            }
            // set local storage updated object
            window.localStorage.setItem("carts", JSON.stringify(carts));

            // store data into store context
            dispatch({
                type: StoreActionType.ADD_TO_CART,
                payload: carts,
            });
        }
    };
    const handleNumberChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        setCountNumber(e.target.value);
    };

    const handleQuantityChange = () => {
        let count = parseInt(countNumber) < 1 ? 1 : parseInt(countNumber);

        // checking available product
        if (count > quantity) {
            toast.error(`Max available ${quantity} products`);
            return;
        }
        let carts = [];
        if (typeof window !== "undefined") {
            // checking already carts to the window localStorage
            let cartsFromLocalStorage: string | null =
                window.localStorage.getItem("carts");
            if (cartsFromLocalStorage !== null) {
                carts = JSON.parse(cartsFromLocalStorage);
            }
            for (let i = 0; i < carts.length; i++) {
                if (carts[i]._id === product._id) {
                    carts[i].count = parseInt(countNumber);
                }
            }
            // changing count value store local storage
            window.localStorage.setItem("carts", JSON.stringify(carts));
            // store data into redux
            dispatch({
                type: StoreActionType.ADD_TO_CART,
                payload: carts,
            });
        }
    };

    const removeCartHandler = () => {
        let carts = [];
        let cartsFromLocalStorage: string | null =
            window.localStorage.getItem("carts");
        if (cartsFromLocalStorage !== null) {
            carts = JSON.parse(cartsFromLocalStorage);
        }
        // delete carts
        for (let i = 0; i < carts.length; i++) {
            if (carts[i]._id === product._id) {
                carts.splice(i, 1);
            }
        }
        // set undeleted carts into the window local storage
        window.localStorage.setItem("carts", JSON.stringify(carts));
        // store redux
        dispatch({
            type: StoreActionType.ADD_TO_CART,
            payload: carts,
        });
    };

    return (
        <tr className="bg-white border-b">
            <td>
                <div style={{ width: "100px", height: "auto" }}>
                    {product && images && images.length ? (
                        <Image
                            src={images[0].url}
                            alt={title}
                            className="w-10 h-10 rounded-full"
                            width={100}
                            height={80}
                        />
                    ) : (
                        <Image
                            src={"/docs/images/people/profile-picture-3.jpg"}
                            alt={title}
                            className="w-10 h-10 rounded-full"
                            width={100}
                            height={80}
                        />
                    )}
                </div>
            </td>
            <td className="text-center">{title} </td>
            <td className="text-center">${price} </td>
            <td className="text-center">{brand} </td>
            <td>
                <select
                    onChange={handleColorChange}
                    name="color"
                    className="form-select"
                >
                    {color ? (
                        <option value={color}>{color}</option>
                    ) : (
                        <option>Select Color</option>
                    )}
                    {colorArray &&
                        colorArray
                            .filter((c) => c !== color)
                            .map((color) => (
                                <option key={color} value={color}>
                                    {color}
                                </option>
                            ))}
                </select>
            </td>
            <td className="text-center">
                <input
                    type="number"
                    min="1"
                    max={quantity}
                    className="form-control"
                    value={countNumber}
                    onChange={handleNumberChange}
                />
            </td>
            <td className="text-center">
                {shipping === "Yes" ? (
                    <FaRegCheckCircle className="text-green-700 inline-block" />
                ) : (
                    <FaRegCheckCircle className="text-red-600 inline-block" />
                )}
            </td>
            <td className="text-center cursor-pointer" onClick={removeCartHandler}>
                <AiOutlineCloseCircle
                    className="text-red-600 inline-block"
                />
            </td>
        </tr>
    );
};

export default CartTable;
