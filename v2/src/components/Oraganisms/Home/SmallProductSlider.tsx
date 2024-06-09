"use client";

import SectionTitle from "../../Molecules/SectionTitle";
import SmallProduct from "../../Molecules/Products/SmallProduct";
import SecondLevelHeading from "../../Atoms/SecondLevelHeading";
import cn from "@/lib/cn";
import Empty from "@/components/Molecules/Empty";

import { IProduct } from "@/types/product.type";

interface SmallProductSliderProps {
    products: IProduct[];
    title: string;
    className?: string;
}

const SmallProductSlider: React.FC<SmallProductSliderProps> = ({
    title = "",
    products = [],
    className = "",
}) => {
    let content = null;

    if (products?.length) {
        content = (
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                <div className="">
                    <SecondLevelHeading
                        className={
                            "font-bold border-b-2 border-bg-black/80 relative  before:inline-block before:absolute before:bg-green-400 before:w-[96px] before:h-1 before:-bottom-[2px] before:left-[0%] before:right-[0%]"
                        }
                        title={"New Arrivals"}
                    />

                    <SmallProduct products={products} />
                </div>
                <div className="">
                    <SecondLevelHeading
                        className={
                            "font-bold border-b-2 border-bg-black/80 relative  before:inline-block before:absolute before:bg-green-400 before:w-[70px] before:h-1 before:-bottom-[2px] before:left-[0%] before:right-[0%]"
                        }
                        title={"Top Sells"}
                    />

                    <SmallProduct
                        products={products?.sort(
                            (a: IProduct, b: IProduct) => b.sold - a.sold
                        )}
                    />
                </div>
                <div className="">
                    <SecondLevelHeading
                        className={
                            "font-bold border-b-2 border-bg-black/80 relative  before:inline-block before:absolute before:bg-green-400 before:w-[144px] before:h-1 before:-bottom-[2px] before:left-[0%] before:right-[0%]"
                        }
                        title={"Featured Products"}
                    />

                    <SmallProduct
                        products={products?.filter(
                            (product: IProduct) => product.isFeatured
                        )}
                    />
                </div>
            </div>
        );
    }

    if (!products?.length) {
        content = <Empty description="No Product Data" />;
    }
    return (
        <div className={cn("container mx-auto px-6", className)}>
            <SectionTitle title={title} />
            <div>{content}</div>
        </div>
    );
};

export default SmallProductSlider;
