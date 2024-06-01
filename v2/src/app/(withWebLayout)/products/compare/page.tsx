import CompareProducts from "@/components/Oraganisms/Products/CompareProducts";
import { getProducts } from "@/api/products";

const CompareProductsPage = async () => {
    const products = await getProducts({ limit: 0 });
    return <CompareProducts products={products?.data?.data} />;
};

export default CompareProductsPage;
