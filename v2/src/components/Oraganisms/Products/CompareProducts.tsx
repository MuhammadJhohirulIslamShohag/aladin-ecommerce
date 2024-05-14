"use client"
import { useOptimistic } from "react";

import ComparisonProduct from "../../Molecules/Home/ComparisonProduct";
import CompareProductTop from "../../Molecules/Compare/CompareProductTop";
import ComparisonSpecification from "../../Molecules/Compare/ComparisonSpecification";
import SectionTitle from "../../Molecules/SectionTitle";

import { compareProducts } from "../../../utils/compareProducts";
import { CompareProduct, IProduct, RootProperty } from "@/types/product.type";
import { getCompareProducts } from "@/store/compare/compare.product";

interface CompareProductsProps {
    products: IProduct[];
}

const CompareProducts: React.FC<CompareProductsProps> = ({ products }) => {
    const compareProductLists: IProduct[] = getCompareProducts();

    const [comProductOptimistic, setRemoveComProductOptimistic] = useOptimistic(
        compareProductLists,
        (state: IProduct[], newState: unknown) => {
            if (Array.isArray(newState)) {
                return (state = []);
            } else {
                return state.filter((p: IProduct) => p._id !== newState);
            }
        }
    );

    const rootProperties: {
        rootPropertiesArray: RootProperty[];
        categoryProductLists: CompareProduct[][];
    } = compareProducts(compareProductLists);

    const isLast =
        compareProductLists.length === compareProductLists.length - 1;
    const classes = isLast
        ? "p-4"
        : "p-4 border-y border-r border-blue-gray-50";

    return (
        <div className="md:container md:mx-auto md:px-6 px-2 bg-white pt-10">
            <SectionTitle title="Product Comparison" className={"-mb-4"} />
            <div className="px-4 lg:px-20 font-Quicksand py-6">
                <div className="mt-4">
                    {comProductOptimistic?.length > 0 ? (
                        <div className="grid grid-cols-12">
                            <div className="col-span-2 lg:block hidden  border border-grayFive">
                                <div className="px-3">
                                    <h4 className="mt-4 font-bold text-base">
                                        Product Comparison
                                    </h4>
                                </div>
                            </div>
                            <div
                                className={`${
                                    comProductOptimistic?.length < 4
                                        ? "lg:col-span-8 md:col-span-10 col-span-10"
                                        : "lg:col-span-10 md:col-span-12 col-span-12"
                                }`}
                            >
                                <div
                                    className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-${
                                        comProductOptimistic?.length ||
                                        "lg:grid-cols-4"
                                    } w-full `}
                                >
                                    {comProductOptimistic?.map(
                                        (compareProduct) => {
                                            return (
                                                <CompareProductTop
                                                    key={compareProduct?._id}
                                                    className={classes}
                                                    compareProduct={
                                                        compareProduct
                                                    }
                                                    setRemoveComProductOptimistic={
                                                        setRemoveComProductOptimistic
                                                    }
                                                />
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-[40%] mx-auto py-12">
                            <ComparisonProduct products={products || []} />
                        </div>
                    )}
                </div>
               <ComparisonSpecification
                    rootPropertiesArray={rootProperties?.rootPropertiesArray}
                    categoryProductLists={rootProperties?.categoryProductLists}
                /> 
            </div>
        </div>
    );
};

export default CompareProducts;
