import axios from "axios";

// for getting single product
export const getSubCategories = async () => {
    return await axios.get(`${process.env.NEXT_PUBLIC_server_api}/sub-categories`);
};