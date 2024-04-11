import { UploadFile } from "antd";

export interface ICreateProductForm {
    productName: string;
    metaName: string;
    price: number;
    shipping: string;
    discount: number;
    quantity: number;
    category: string;
    brand: string;
    colors: string;
    sizes: string;
    subCategories: string;
    description: string;
    productImgFiles: UploadFile[];
}
