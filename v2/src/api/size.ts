import axios from "axios";

export const getListOfSizes = async () => {
    try {
        return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/sizes`);
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};

export const getSingleSize = async (slug: string) => {
    try {
        return await axios.get(
            `${process.env.NEXT_PUBLIC_SERVER_API}/sizes/${slug}`
        );
    } catch (error) {
        throw new Error("Failed to fetch data");
    }
};
