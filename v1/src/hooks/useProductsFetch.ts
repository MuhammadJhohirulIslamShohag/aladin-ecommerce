import { useEffect, useState } from "react";
import { getProductsBySort } from "@/api/products";

const useProductsFetch = () => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadingProducts();
    }, []);

    const loadingProducts = () => {
        setLoading(true);
        getProductsBySort("createdAt", "desc")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    };
    return {
        loading,
        products,
    };
};

export default useProductsFetch;
