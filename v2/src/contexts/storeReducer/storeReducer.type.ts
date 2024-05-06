import { CartType } from "@/types/cart.types";
import { IProduct } from "@/types/product.type";

export enum StoreActionType {
    ADD_TO_CART = "ADD_TO_CART",
    ADD_TO_COMPARE = "ADD_TO_COMPARE",
    REMOVE_TO_COMPARE = "REMOVE_TO_COMPARE",
    REMOVE_ALL_COMPARE = "REMOVE_ALL_COMPARE",
    ADD_TO_WISH = "ADD_TO_WISH",
    REMOVE_TO_WISH = "REMOVE_TO_WISH",
    REMOVE_ALL_WISH = "REMOVE_ALL_WISH",
    SEARCH_FILTER_VALUE = "SEARCH_FILTER_VALUE",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    ADD_SHIPPING_ADDRESS = "ADD_SHIPPING_ADDRESS",
    ADD_COUPON = "ADD_COUPON",
}

export type StoreDataType = {
    carts: CartType[];
    compareProducts: IProduct[];
    wishLists: IProduct[];
    text: string;
    isCashOnDelivery: boolean;
    isCouped: boolean;
    shippingAddress: {};
};

export interface StoreAction {
    type: StoreActionType;
    payload: any;
}
