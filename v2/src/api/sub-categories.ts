import axios from "axios";

export const getAllSubCategories = async (query: Record<string, any>) => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/sub-categories`,
            {
                params: query,
            }
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

export const getSubCategory = async (slug: string) => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_server_api}/sub-categories/${slug}`
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
