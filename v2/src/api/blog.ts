import axios from "axios";

export const getListOfBlogs = async (query: Record<string, any>) => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/blogs`, {
            params: query,
        });
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
