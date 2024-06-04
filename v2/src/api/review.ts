import { config } from "@/config/envConfig";
import axios from "axios";

// for getting all reviews
export const getReviews = async (query: Record<string, unknown>) => {
    try {
        return await axios.get(
            `${config.baseURL}/reviews`,
            {
                params: query,
            }
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

// for getting single review
export const getSingleReview = async (payload: string) => {
    try {
        return await axios.get(
            `${config.baseURL}/reviews/${payload}`
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};