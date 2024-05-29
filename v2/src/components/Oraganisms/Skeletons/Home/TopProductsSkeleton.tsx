import FlatProduct from "../../../Molecules/Skeletons/Product/FlatProduct";
import Product from "../../../Molecules/Skeletons/Product/Product";
import SectionTitle from "../../../Molecules/Skeletons/SectionTitle";

const TopProductsSkeleton = () => {
    return (
        <div className="container">
            <div>
                <SectionTitle />
            </div>
            <div className="lg:grid grid-cols-12 justify-between gap-6 lg:space-y-0 space-y-7 ">
                <div className="xl:col-span-9 lg:col-span-7">
                    <div className="lg:block hidden">
                        <div className="grid grid-cols-2">
                            <FlatProduct />
                            <FlatProduct />
                            <FlatProduct />
                            <FlatProduct />
                        </div>
                    </div>
                    <div className="lg:hidden block">
                        <div className="grid md:grid-cols-2 gap-4 grid-cols-1">
                            <Product />
                            <Product />
                        </div>
                    </div>
                </div>
                <div className="xl:col-span-3 lg:col-span-5  text-white lg:flex hidden justify-center items-center  rounded-md py-3 lg:h-full xl:h-[380px]">
                    <Product />
                </div>
            </div>
        </div>
    );
};

export default TopProductsSkeleton;
