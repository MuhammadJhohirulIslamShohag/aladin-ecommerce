import { CartType } from "@/types/cart.types";


export enum StoreActionType {
    ADD_TO_CART = "ADD_TO_CART",
    SEARCH_FILTER_VALUE = "SEARCH_FILTER_VALUE",
    CASH_ON_DELIVERY = "CASH_ON_DELIVERY",
    ADD_SHIPPING_ADDRESS = "ADD_SHIPPING_ADDRESS",
    ADD_COUPON = "ADD_COUPON",
}


export type StoreDataType = {
    carts: CartType[];
    text: string;
    isCashOnDelivery: boolean;
    isCouped: boolean;
    shippingAddress: {};
};

export interface StoreAction {
    type: StoreActionType;
    payload: any;
}
