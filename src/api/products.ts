import axios from "axios";

// for creating product
export const createProduct = async (authToken: string, productObject: any) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/product`,
        productObject,
        {
            headers: {
                authToken,
            },
        }
    );
};

// for getting products with number how many we want
export const getProductsByCount = async (count: any) =>
    await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/products/count/${count}`
    );

// for getting all products by sorting with pagination
export const getProductsBySort = async (sort: any, order: any, page?: any) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/products?sort=${sort}&order=${order}&page=${page}`
    );
};

// for getting all products
export const getTotalProducts = async () =>
    await axios.post(`${process.env.NEXT_PUBLIC_server_api}/products/total`);

// for getting single product
export const getProduct = async (slug: any) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/products/${slug}`
    );
};

// for update product
export const updateProduct = async (
    authToken: string,
    slug: any,
    updateProducts: any
) => {
    return await axios.put(
        `${process.env.NEXT_PUBLIC_server_api}/products/${slug}`,
        updateProducts,
        {
            headers: {
                authToken,
            },
        }
    );
};

// for removing product
export const deleteProduct = async (authToken: string, slug: any) => {
    return await axios.delete(
        `${process.env.NEXT_PUBLIC_server_api}/products/${slug}`,
        {
            headers: {
                authToken,
            },
        }
    );
};

// for ratings  product
export const productRating = async (
    authToken: string,
    productId: any,
    star: any
) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/products/ratings/${productId}`,
        { star },
        {
            headers: {
                authToken,
            },
        }
    );
};

// for getting related product
export const relatedProducts = async (productId: any) => {
    return await axios.get(
        `${process.env.NEXT_PUBLIC_server_api}/products/related/${productId}`
    );
};

// for getting filter related product
export const getFilterRelatedProducts = async (argument: any) => {
    return await axios.post(
        `${process.env.NEXT_PUBLIC_server_api}/products/filter`,
        argument
    );
};
