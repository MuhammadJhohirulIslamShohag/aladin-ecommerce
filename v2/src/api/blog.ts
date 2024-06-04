import { config } from "@/config/envConfig";
import axios from "axios";

export const getListOfBlogs = async (query: Record<string, any>) => {
    try {
        return await axios.get(`${config.baseURL}/blogs`, {
            params: query,
        });
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
