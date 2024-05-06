import { wishListProductKey } from "@/constants/storageKey";
import { setToLocalStorage, getFromLocalStorage } from "@/utils/local-storage";

export const storeWishListProducts = (payload: string) => {
    return setToLocalStorage(wishListProductKey, payload);
};

export const getWishListProducts = () => {
    const wishListProducts = getFromLocalStorage(wishListProductKey);

    if (wishListProducts) {
        return JSON.parse(wishListProducts);
    } else {
        return [];
    }
};

export const removeWishListProduct = (key: string) => {
    return localStorage.removeItem(key);
};
