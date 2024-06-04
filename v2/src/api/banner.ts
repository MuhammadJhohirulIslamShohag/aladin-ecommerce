import { config } from "@/config/envConfig";
import axios from "axios";

export const getListOfBanners = async (query: Record<string, any>) => {
    try {
        return await axios.get(`${config.baseURL}/banners`, {
            params: query,
        });
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
