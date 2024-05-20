import SectionTitle from "../../Molecules/SectionTitle";
import SmallProduct from "../../Molecules/Products/SmallProduct";
import SecondLevelHeading from "../../Atoms/SecondLevelHeading";
import { IProduct } from "@/types/product.type";
import cn from "@/lib/cn";

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
    return (
        <div className={cn("container mx-auto px-6", className)}>
            <SectionTitle title={title} />
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

                    <SmallProduct products={products} />
                </div>
                <div className="">
                    <SecondLevelHeading
                        className={
                            "font-bold border-b-2 border-bg-black/80 relative  before:inline-block before:absolute before:bg-green-400 before:w-[144px] before:h-1 before:-bottom-[2px] before:left-[0%] before:right-[0%]"
                        }
                        title={"Featured Products"}
                    />

                    <SmallProduct products={products} />
                </div>
            </div>
        </div>
    );
};

export default SmallProductSlider;
