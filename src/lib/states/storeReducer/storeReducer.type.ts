export enum StoreActionType {
    LOGGED_IN_USER = "LOGGED_IN_USER",
    LOGOUT_USER = "LOGOUT_USER",
    ADD_TO_CART = "ADD_TO_CART",
}

interface UserType {
    email: string;
    fullName: string;
    role: string;
    token: string;
    image:string;
    _id: string;
}
interface CartType {
    slug: string;
    title: string;
    images: string;
    description: string;
    quantity: number | string;
};

export type StoreDataType = {
    user: UserType | null;
    carts: CartType[];
};

export interface StoreAction {
    type: StoreActionType;
    payload: any;
}
