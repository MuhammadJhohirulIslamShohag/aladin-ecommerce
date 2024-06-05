import { config } from "@/config/envConfig";
import axios from "axios";

export const getListOfBanners = async (query: Record<string, any>) => {
    try {
        const response = await axios.get(`${config.baseURL}/banners`, {
            params: query,
        });
        return response;
    } catch (error:any) {
        console.error("Error fetching banners:", error.response ? error.response.data : error.message);
        throw new Error("Failed to fetch data");
    }
};
