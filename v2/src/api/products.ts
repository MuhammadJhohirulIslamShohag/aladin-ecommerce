import axios from "axios";

// for getting all products
export const getProducts = async () => {
    return await axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/products`);
};
