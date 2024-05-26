import axios from "axios";

// for getting all products
export const getProducts = async (query: Record<string, unknown>) => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/products`,
            {
                params: query,
            }
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

// for getting all products
export const getProductsByFilter = async (query: Record<string, unknown>) => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/products/by-filters`,
            {
                params: query,
            }
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

// for getting single product
export const getSingleProduct = async (payload: string) => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/products/${payload}`
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
