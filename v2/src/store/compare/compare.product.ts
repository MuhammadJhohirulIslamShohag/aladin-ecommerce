import { compareProductKey } from "@/constants/storageKey";
import { setToLocalStorage, getFromLocalStorage } from "@/utils/local-storage";

export const storeCompareProducts = (payload: string) => {
    return setToLocalStorage(compareProductKey, payload);
};

export const getCompareProducts = () => {
    const compareProducts = getFromLocalStorage(compareProductKey);

    if (compareProducts) {
        return JSON.parse(compareProducts);
    } else {
        return [];
    }
};

export const removeCompareProduct = (key: string) => {
    return localStorage.removeItem(key);
};
