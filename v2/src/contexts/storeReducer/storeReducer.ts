import { getCarts } from "@/store/cart/cart";
import { getCompareProducts } from "@/store/compare/compare.product";
import {
    StoreAction,
    StoreActionType,
    StoreDataType,
} from "./storeReducer.type";
import { getWishListProducts } from "@/store/wishList/wishList.product";

export const initialState: StoreDataType = {
    text: "",
    isCashOnDelivery: false,
    isCouped: false,
    shippingAddress: {},
    carts: [],
    wishLists: [],
    compareProducts: [],
};

//  to add data from window local storage to the initial state
if (typeof window !== "undefined") {
    // for carts
    const carts = getCarts();
    initialState.carts = carts?.length ? carts : [];

    // for compare products
    const compareProducts = getCompareProducts();
    initialState.compareProducts = compareProducts?.length
        ? compareProducts
        : [];

    // for wish list products
    const wishListProducts = getWishListProducts();
    initialState.wishLists = wishListProducts?.length ? wishListProducts : [];
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

        // Compare products
        case StoreActionType.ADD_TO_COMPARE:
            return {
                ...state,
                compareProducts: action.payload,
            };
        case StoreActionType.REMOVE_TO_COMPARE:
            return {
                ...state,
                compareProducts: state.compareProducts.filter(
                    (product) => product._id !== action.payload
                ),
            };
        case StoreActionType.REMOVE_ALL_COMPARE:
            return {
                ...state,
                compareProducts: [],
            };

        // wish list products
        case StoreActionType.ADD_TO_WISH:
            return {
                ...state,
                wishLists: action.payload,
            };
        case StoreActionType.REMOVE_TO_WISH:
            return {
                ...state,
                wishLists: state.wishLists.filter(
                    (product) => product._id !== action.payload
                ),
            };
        case StoreActionType.REMOVE_ALL_WISH:
            return {
                ...state,
                wishLists: [],
            };
        default:
            return state;
    }
};
