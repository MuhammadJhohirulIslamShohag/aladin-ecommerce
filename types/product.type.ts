export interface IProduct {
    _id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    category: {
        createdAt: Date;
        name: string;
        slug: string;
        updatedAt: Date;
        __v: number;
        _id: string;
    };
    subCategory: {
        createdAt: Date;
        name: string;
        slug: string;
        parent: string;
        updatedAt: Date;
        __v: number;
        _id: string;
    }[];
    quantity: number;
    sold: number;
    images: {
        public_id: string;
        url: string;
    }[];
    shipping: string;
    color: string;
    brand: string;
    ratings: {
        postedBy: string;
        star: number;
        _id: string;
    }[];
    updatedAt: Date;
    __v: number;
}
