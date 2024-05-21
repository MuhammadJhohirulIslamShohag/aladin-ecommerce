import { cartKey } from "@/constants/storageKey";
import { setToLocalStorage, getFromLocalStorage } from "@/utils/local-storage";

export const storeCart = (payload: string) => {
    return setToLocalStorage(cartKey, payload);
};

export const getCarts = () => {
    const carts = getFromLocalStorage(cartKey);

    if (carts) {
        return JSON.parse(carts);
    } else {
        return [];
    }
};

export const removeCart = () => {
    return localStorage.removeItem(cartKey);
};
