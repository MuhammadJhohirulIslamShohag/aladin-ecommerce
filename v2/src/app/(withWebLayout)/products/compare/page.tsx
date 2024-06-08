import { Metadata } from "next";

import CompareProducts from "@/components/Oraganisms/Products/CompareProducts";
import { getProducts } from "@/api/products";

export const metadata: Metadata = {
    title: "Compare-Products",
    description:
        "Welcome to the Compare Products page of Aladin-E-Commerce Online Shopping Platform. Compare different products side by side to make informed purchase decisions.",
};

const CompareProductsPage = async () => {
    const products = await getProducts({ limit: 0 });
    return <CompareProducts products={products?.data?.data} />;
};

export default CompareProductsPage;
