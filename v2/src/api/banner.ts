import axios from "axios";

export const getListOfBanners = async (query: Record<string, any>) => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/banners`, {
            params: query,
        });
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
