import axios from "axios";
import { CartType } from "@/types/cart.types";

export const saveOrder = (carts: CartType[], token: string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/users/cart`,
        {
            carts,
        },
        {
            headers: {
                token,
            },
        }
    );
};
export const saveShippingAddress = (addressValues: any, token: string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/users/address`,
        addressValues,
        {
            headers: {
                token,
            },
        }
    );
};
export const getUserShippingAddress = (token: string) => {
    return axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/users/shipping-address`,
        {
            headers: {
                token,
            },
        }
    );
};

export const getUsersCart = (token: string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_server_api}/users/cart`, {
        headers: {
            token,
        },
    });
};

export const emptyCart = (token: string) => {
    return axios.delete(`${process.env.NEXT_PUBLIC_server_api}/users/cart`, {
        headers: {
            token,
        },
    });
};

// getting discount price
export const getTotalPriceAfterDiscount = (
    couponName: string,
    token: string
) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/users/cart/coupon`,
        { couponName },
        {
            headers: {
                token,
            },
        }
    );
};

// creating new order with payment intents
export const createOrder = (paymentInfoObject: any, token: string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/users/carts/order`,
        paymentInfoObject,
        {
            headers: {
                token,
            },
        }
    );
};
// creating new order with cash on delivery
export const createOrderCashOnDelivery = (
    isCashOnDelivery: any,
    isCoupon: any,
    token: string
) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/users/carts/order/cash`,
        { isCashOnDelivery, isCoupon },
        {
            headers: {
                token,
            },
        }
    );
};

// getting all orders by users
export const getOrdersByUser = async (token: string) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/users/carts/orders`,
        {
            headers: {
                token,
            },
        }
    );
};

// add to wishlist
export const addToWishList = async (token: string, productId: string) => {
    try {
        return await axios.post(
            `${process.env.NEXT_PUBLIC_server_api}/users/wishlist`,
            {
                productId,
            },
            {
                headers: {
                    token,
                },
            }
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

// get all wishlist from users
export const getWishLists = async (token: string) => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/users/wishlists`,
            {
                headers: {
                    token,
                },
            }
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

// get all wishlist from users
export const getWishList = async (token: string, productId: string) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/users/wish-lists`,
        { productId },
        {
            headers: {
                token,
            },
        }
    );
};

// remove wishlist
export const removeWishList = async (token: string, productId: string) => {
    try {
        return await axios.delete(
            `${process.env.NEXT_PUBLIC_server_api}/users/wishlist/${productId}`,
            {
                headers: {
                    token,
                },
            }
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
