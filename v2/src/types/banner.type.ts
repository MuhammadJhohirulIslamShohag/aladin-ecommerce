import { IOffer } from "./offer.type";

export interface IBanner {
    image: string;
    offer: IOffer;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
    _id: string;
}
