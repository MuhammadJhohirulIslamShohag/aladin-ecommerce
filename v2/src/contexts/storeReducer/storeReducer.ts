import { getCarts } from "@/store/cart/cart";
import {
    StoreDataType,
    StoreAction,
    StoreActionType,
} from "./storeReducer.type";

export const initialState: StoreDataType = {
    carts: [],
    text: "",
    isCashOnDelivery: false,
    shippingAddress: {},
    isCouped: false,
};

//  to add data from window local storage to the initial state
if (typeof window !== "undefined") {
    const carts = getCarts();
    if (carts?.length) {
        initialState.carts = carts;
    } else {
        initialState.carts = [];
    }
}

export const storeReducer = (
    state: StoreDataType = initialState,
    action: StoreAction
): StoreDataType => {
    switch (action.type) {
        case StoreActionType.ADD_TO_CART:
            return {
                ...state,
                carts: action.payload,
            };
        case StoreActionType.ADD_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };
        case StoreActionType.ADD_COUPON:
            return {
                ...state,
                isCouped: action.payload,
            };
        case StoreActionType.CASH_ON_DELIVERY:
            return {
                ...state,
                isCashOnDelivery: action.payload,
            };
        case StoreActionType.SEARCH_FILTER_VALUE:
            return { ...state, text: action.payload };
        default:
            return state;
    }
};
