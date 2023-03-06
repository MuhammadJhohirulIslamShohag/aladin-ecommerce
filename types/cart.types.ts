import { IProduct } from "types/product.type";

export interface CountType {
    count?: number | string; 
    color:string;
    size:string;
}

export type CartType = IProduct & CountType;
