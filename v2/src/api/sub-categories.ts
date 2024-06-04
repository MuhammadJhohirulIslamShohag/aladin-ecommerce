import { config } from "@/config/envConfig";
import axios from "axios";

export const getAllSubCategories = async (query: Record<string, any>) => {
    try {
        return await axios.get(`${config.baseURL}/sub-categories`, {
            params: query,
        });
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

export const getSubCategory = async (slug: string) => {
    try {
        return await axios.get(`${config.baseURL}/sub-categories/${slug}`);
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
