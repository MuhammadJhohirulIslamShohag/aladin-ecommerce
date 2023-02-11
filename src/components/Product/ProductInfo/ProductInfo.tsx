import React from "react";
import CustomButton from "@/components/UI/CustomButton/CustomButton";
import { BsHandbagFill, BsFillHeartFill } from "react-icons/bs";
import { RadioGroup } from "@headlessui/react";
import ProductDescriptionItem from "./../ProductDescription/ProductDescriptionItem";
import { AvgRating } from "./../../../lib/utils/avgRating";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const ProductInfo = ({
    product,
    colorArray,
    sizeArray,
    selectedColor,
    setSelectedColor,
    selectedSize,
    setSelectedSize,
    handleAddCart,
    handleAddToWishList,
    heartFillIcon,
    isAddToCart
}: any) => {
    const { title, price, category, shipping, brand, _id } = product;
    return (
        <>
            <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {title}
                </h1>
            </div>
            {/* Reviews */}
            <AvgRating product={product} />
            {/* Options */}
            <div className="mt-4">
                <div>
                    <span className="text-3xl tracking-tight text-gray-900">
                        {price}
                    </span>
                    <span className="text-3xl ml-4 line-through tracking-tight text-gray-900">
                        {price}
                    </span>
                </div>

                <div className="mt-5">
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Brand"
                        value={brand}
                    />
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Category"
                        value={category?.name}
                    />
                    <ProductDescriptionItem
                        isBorderClassName={true}
                        name="Shipping"
                        value={shipping}
                    />
                </div>

                <form className="mt-5">
                    {/* Colors */}
                    <div>
                        <h3 className="text-sm font-medium text-gray-900">
                            Choose Color
                        </h3>

                        <RadioGroup
                            value={selectedColor}
                            onChange={(v: string) => setSelectedColor(v)}
                            className="mt-4"
                        >
                            <div className="flex items-center space-x-3">
                                {colorArray.map((color: string) => (
                                    <RadioGroup.Option
                                        key={color}
                                        value={color}
                                        className={({ active, checked }) =>
                                            classNames(
                                                active && checked
                                                    ? "ring ring-green-300 ring-offset-green-300"
                                                    : "",
                                                !active && checked
                                                    ? "ring-2 ring-green-300 ring-offset-green-300"
                                                    : "",
                                                `-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none`
                                            )
                                        }
                                    >
                                        <span
                                            className={`${
                                                color === "Rose"
                                                    ? "bg-red-600"
                                                    : color === "Green"
                                                    ? `bg-success`
                                                    : `bg-${color.toLowerCase()}`
                                            } h-8 w-8 border border-black border-opacity-10 rounded-full`}
                                        />
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Sizes */}
                    <div className="mt-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium text-gray-900">
                                Choose Size
                            </h3>
                        </div>

                        <RadioGroup
                            value={selectedSize}
                            onChange={(v: string) => setSelectedSize(v)}
                            className="mt-4"
                        >
                            <div className="grid grid-cols-4 gap-4 sm:grid-cols-4 md:grid-cols-4">
                                {sizeArray.map((size: any) => (
                                    <RadioGroup.Option
                                        key={size.name}
                                        value={size}
                                        disabled={!size.inStock}
                                        className={({ active }) =>
                                            classNames(
                                                size.inStock
                                                    ? "bg-white shadow-sm text-gray-900 cursor-pointer"
                                                    : "bg-gray-50 text-gray-200 cursor-not-allowed",
                                                active
                                                    ? "ring-2 ring-green-500"
                                                    : "",
                                                "group relative border rounded-md py-3 px-4 flex items-center justify-center text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
                                            )
                                        }
                                    >
                                        {({ active, checked }) => (
                                            <>
                                                <RadioGroup.Label as="span">
                                                    {size.name}
                                                </RadioGroup.Label>
                                                {size.inStock ? (
                                                    <span
                                                        className={classNames(
                                                            active
                                                                ? "border"
                                                                : "border-2",
                                                            checked
                                                                ? "border-green-500"
                                                                : "border-transparent",
                                                            "pointer-events-none absolute -inset-px rounded-md"
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                ) : (
                                                    <span
                                                        aria-hidden="true"
                                                        className="pointer-events-none absolute -inset-px rounded-md border-2 border-gray-200"
                                                    >
                                                        <svg
                                                            className="absolute inset-0 h-full w-full stroke-2 text-gray-200"
                                                            viewBox="0 0 100 100"
                                                            preserveAspectRatio="none"
                                                            stroke="currentColor"
                                                        >
                                                            <line
                                                                x1={0}
                                                                y1={100}
                                                                x2={100}
                                                                y2={0}
                                                                vectorEffect="non-scaling-stroke"
                                                            />
                                                        </svg>
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </RadioGroup.Option>
                                ))}
                            </div>
                        </RadioGroup>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-1 gap-4">
                        <CustomButton
                            buttonType="button"
                            className="mt-10 sm:mt-5 w-full"
                            handleClick={handleAddCart}
                        >
                            <BsHandbagFill className="mr-1" />
                            {isAddToCart?.length > 0 ? "Added To Cart" : "Add To Cart"}
                        </CustomButton>
                        {heartFillIcon ? (
                            <CustomButton
                                buttonType="button"
                                className="mt-10 sm:mt-0 w-full"
                                handleClick={handleAddToWishList}
                                
                            >
                                <BsFillHeartFill className="mr-1" />
                                Removed To Wishlist
                            </CustomButton>
                        ) : (
                            <CustomButton
                                buttonType="button"
                                className="mt-10 sm:mt-0 w-full"
                                handleClick={handleAddToWishList}
                            >
                                <BsFillHeartFill className="mr-1" />
                                Add To WishList
                            </CustomButton>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
};

export default ProductInfo;
