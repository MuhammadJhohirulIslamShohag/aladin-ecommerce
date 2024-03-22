export interface ISubCategory {
    _id: string;
    name: string;
    imageURL: string;
    createdAt: Date;
    categories: [
        {
            categoryId: string;
        }
    ];
    updatedAt: Date;
}
