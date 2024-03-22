import axios from "axios";

export const getCategories = async (query: Record<string, any>) => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/categories`,
            {
                params: query,
            }
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

export const getSingleCategory = async (slug: string) => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/categories/${slug}`
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
