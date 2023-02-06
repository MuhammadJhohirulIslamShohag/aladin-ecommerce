import axios from "axios";

export const saveOrder = (carts:any, token:string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/cart`,
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
export const saveShippingAddress = (addressValues:any, token:string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/address`,
        addressValues,
        {
            headers: {
                token,
            },
        }
    );
};
export const getUserShippingAddress = (token:string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/user/shipping-address`, {
        headers: {
            token,
        },
    });
};

export const getUserCart = (token:string) => {
    return axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/user/cart`, {
        headers: {
            token,
        },
    });
};

export const emptyCart = (token:string) => {
    return axios.delete(`${process.env.NEXT_PUBLIC_SERVER_API}/user/cart`, {
        headers: {
            token,
        },
    });
};

// getting discount price
export const getTotalPriceAfterDiscount = (couponName:string, token:string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/cart/coupon`,
        { couponName },
        {
            headers: {
                token,
            },
        }
    );
};

// creating new order with payment intents
export const createOrder = (paymentIntents:any, token:string) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/carts/order`,
        { paymentIntents },
        {
            headers: {
                token,
            },
        }
    );
};
// creating new order with cash on delivery
export const createOrderCashOnDelivery = (
    isCashOnDelivery:any,
    isCoupon:any,
    token:string
) => {
    return axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/carts/order/cash`,
        { isCashOnDelivery, isCoupon },
        {
            headers: {
                token,
            },
        }
    );
};

// getting all orders by user
export const getOrdersByUser = async (token:string) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/carts/orders`,
        {
            headers: {
                token,
            },
        }
    );
};

// add to wishlist
export const addToWishList = async (token:string, productId:string, isWishList:any) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/wishlists`,
        { productId, isWishList },
        {
            headers: {
                token,
            },
        }
    );
};

// get all wishlist from user
export const getWishLists = async (token:string) => {
    return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/user/wishlists`, {
        headers: {
            token,
        },
    });
};

// get all wishlist from user
export const getWishList = async (token:string, productId:string) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/wish-list`,
        { productId },
        {
            headers: {
                token,
            },
        }
    );
};

// remove wishlist
export const removeWishList = async (token:string, productId:string) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_API}/user/wishlists`,
        { productId },
        {
            headers: {
                token,
            },
        }
    );
};
