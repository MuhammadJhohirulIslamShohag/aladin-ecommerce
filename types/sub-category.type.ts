export interface ISubCategories {
    name: string;
    slug: string;
    image?: {
        url: string;
        public_id: string;
    };
    createdAt: Date;
    parent: string;
    updatedAt: Date;
    __v: number;
    _id: string;
}
