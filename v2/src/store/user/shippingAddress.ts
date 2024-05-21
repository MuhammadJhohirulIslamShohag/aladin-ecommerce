import { shippingAddressKey } from "@/constants/storageKey";
import { getFromLocalStorage, setToLocalStorage } from "@/utils/local-storage";

export const storeShippingAddress = (payload: string) => {
    return setToLocalStorage(shippingAddressKey, payload);
};

export const getShippingAddress = () => {
    const shippingAddress = getFromLocalStorage(shippingAddressKey);

    if (shippingAddress) {
        return JSON.parse(shippingAddress);
    } else {
        return null;
    }
};

export const removeShippingAddress = () => {
    return localStorage.removeItem(shippingAddressKey);
};
