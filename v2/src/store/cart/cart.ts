import { cartKey } from "@/constants/storageKey";
import { setToLocalStorage, getFromLocalStorage } from "@/utils/local-storage";

export const storeCart = (payload: string) => {
    return setToLocalStorage(cartKey, payload);
};

export const getCart = () => {
    const carts = getFromLocalStorage(cartKey);

    if (carts) {
        return JSON.parse(carts);
    } else {
        return null;
    }
};

export const removeCart = (key: string) => {
    return localStorage.removeItem(key);
};
