import { CompareProduct, IProduct, RootProperty } from "@/types/product.type";


export const compareProducts = (
    compareProductsArr: any[] = []
): {
    rootPropertiesArray: RootProperty[];
    categoryProductLists: CompareProduct[][];
} => {
    // get the first product in the list
    const firstProduct: IProduct = compareProductsArr[0];

    // define properties to exclude from comparison
    const excludedProperties = [
        "_id",
        "name",
        "imageURLs",
        "quantity",
        "metaTitle",
        "subCategories",
        "clickedProductCount",
        "description",
        "keyFeatures",
        "questions",
        "reviews",
        "createdAt",
        "updatedAt",
        "__v",
        "id",
        "slug",
        "sold",
        "sizes",
        "colors",
    ];

    // initialize empty lists to store root properties and product value lists
    const rootPropertiesArray: RootProperty[] = [];
    const categoryProductLists: CompareProduct[][] = [];

    // find root properties
    if (firstProduct) {
        for (const key in firstProduct) {
            if (
                firstProduct.hasOwnProperty(key) &&
                !excludedProperties.includes(key)
            ) {
                rootPropertiesArray.push(key as any);
            }
        }
    }

    // iterate through each product and find matching properties
    for (const product of compareProductsArr) {
        const productValues: any = [];

        for (const key in product) {
            if (
                product.hasOwnProperty(key) &&
                !excludedProperties.includes(key)
            ) {
                if (rootPropertiesArray.includes(key as any)) {
                    productValues.push(product[key] );
                }
            }
        }

        categoryProductLists.push(productValues);
    }

    // return the comparison result
    return {
        rootPropertiesArray,
        categoryProductLists,
    };
};
