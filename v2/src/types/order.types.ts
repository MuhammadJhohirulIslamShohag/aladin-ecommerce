import { IProduct } from "./product.type";
import { IUser } from "./user.type";

export interface IOrder {
    _id: string;
    products: {
        product: IProduct;
        count: number;
    }[];
    paymentIntents: any;
    orderStatus: string;
    orderedBy: IUser;
    paymentBy?: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
