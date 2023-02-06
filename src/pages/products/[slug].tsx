import { useState, useEffect } from "react";
import _ from "lodash";
import StarRatings from "react-star-ratings";
import { toast } from "react-hot-toast";
import { RadioGroup } from "@headlessui/react";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { addToWishList, getWishList, removeWishList } from "@/api/user";
import { IProduct } from "../../../types/product.type";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import CardCarousel from "@/components/Card/CardCarousel";
import { useRouter } from "next/router";
import { AvgRating } from "@/lib/utils/avgRating";
import { getProduct } from "@/api/products";

const colorArray = ["Green", "Black", "Red", "White"];
const sizeArray = [
    { name: "XXS", inStock: false },
    { name: "XS", inStock: true },
    { name: "S", inStock: true },
    { name: "M", inStock: true },
    { name: "L", inStock: true },
    { name: "XL", inStock: true },
    { name: "2XL", inStock: true },
    { name: "3XL", inStock: true },
];
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

type ProductDetailsParamsType = {
    params: {
        slug: string;
    };
};
const ProductDetails = ({ product }: { product: IProduct }) => {
    const [selectedColor, setSelectedColor] = useState();
    const [selectedSize, setSelectedSize] = useState();

    const [heartFillIcon, setHeartFillIcon] = useState(false);
    const [tooltipTitle, setTooltipTitle] = useState("Add to Cart");
    const { title, images, price, description, slug, _id, quantity } = product;
    const {
        state: { user },
        dispatch,
    } = useStoreContext();

    const router = useRouter();

    useEffect(() => {
        if (user && user.token) {
            getWishList(user.token, _id).then((res) => {
                if (res.data.wishList.length > 0) {
                    setHeartFillIcon(true);
                }
            });
        }
    }, [user, _id]);

    // const loadWishList = (user) => {

    // }

    const handleAddCart = () => {
        let carts = [];

        if (typeof window !== "undefined") {
            if (window.localStorage.getItem("carts")) {
                // checking already carts to the window localStorage
                let cartsFromLocalStorage: string | null =
                    window.localStorage.getItem("carts");
                if (cartsFromLocalStorage !== null) {
                    carts = JSON.parse(cartsFromLocalStorage);
                }
            }
        }
        // push carts into carts array
        carts.push({
            ...product,
            count: 1,
        });

        // remove duplicates value
        const uniqueCarts = _.uniqWith(carts, _.isEqual);

        // set data local storage
        window.localStorage.setItem("carts", JSON.stringify(uniqueCarts));
        setTooltipTitle("Added!");

        dispatch({
            type: StoreActionType.ADD_TO_CART,
            payload: uniqueCarts,
        });

        // // show drawer carts in the side bar
        // dispatch({
        //     type: "VISIBLE_DRAWER",
        //     payload: true,
        // });
    };

    const handleAddToWishList = () => {
        if (user && user.token) {
            if (heartFillIcon) {
                removeWishList(user.token, _id).then((res) => {
                    setHeartFillIcon(false);
                    toast.error("Product Removed To The WishList");
                });
            } else {
                addToWishList(user.token, _id, true).then((res) => {
                    setHeartFillIcon(true);
                    toast.success("Product Added To The WishList");
                });
            }
        } else {
            router.push(`/auth/login?redirect=/products/${product._id}`);
        }
    };

    return (
        <div className="bg-white container">
            <div className="grid grid-cols-2 pt-6">
                {/* Image gallery */}
                <div>
                    {product &&
                    title &&
                    product.images &&
                    product.images.length ? (
                        <CardCarousel images={images} title={title} />
                    ) : (
                        <h2>No Image On The Product</h2>
                    )}
                </div>

                {/* Product info */}
                <div className="mx-auto max-w-2xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24">
                    <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            {title}
                        </h1>
                    </div>

                    {/* Options */}
                    <div className="mt-4 lg:row-span-3 lg:mt-0">
                        <h2 className="sr-only">Product information</h2>
                        <p className="text-3xl tracking-tight text-gray-900">
                            {price}
                        </p>

                        {/* Reviews */}
                        <AvgRating product={product} />

                        <form className="mt-10">
                            {/* Colors */}
                            <div>
                                <h3 className="text-sm font-medium text-gray-900">
                                    Color
                                </h3>

                                <RadioGroup
                                    value={selectedColor}
                                    onChange={setSelectedColor}
                                    className="mt-4"
                                >
                                    <RadioGroup.Label className="sr-only">
                                        {" "}
                                        Choose a color{" "}
                                    </RadioGroup.Label>
                                    <div className="flex items-center space-x-3">
                                        {colorArray.map((color) => (
                                            <RadioGroup.Option
                                                key={color}
                                                value={color}
                                                className={({
                                                    active,
                                                    checked,
                                                }) =>
                                                    classNames(
                                                        active && checked
                                                            ? "ring ring-offset-1"
                                                            : "",
                                                        !active && checked
                                                            ? "ring-2"
                                                            : "",
                                                        "-m-0.5 relative p-0.5 rounded-full flex items-center justify-center cursor-pointer focus:outline-none"
                                                    )
                                                }
                                            >
                                                <RadioGroup.Label
                                                    as="span"
                                                    className="sr-only"
                                                >
                                                    {" "}
                                                    {color}{" "}
                                                </RadioGroup.Label>
                                                <span
                                                    aria-hidden="true"
                                                    className={classNames(
                                                        color,
                                                        "h-8 w-8 border border-black border-opacity-10 rounded-full"
                                                    )}
                                                />
                                            </RadioGroup.Option>
                                        ))}
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Sizes */}
                            <div className="mt-10">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium text-gray-900">
                                        Size
                                    </h3>
                                    <a
                                        href="#"
                                        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Size guide
                                    </a>
                                </div>

                                <RadioGroup
                                    value={selectedSize}
                                    onChange={setSelectedSize}
                                    className="mt-4"
                                >
                                    <RadioGroup.Label className="sr-only">
                                        {" "}
                                        Choose a size{" "}
                                    </RadioGroup.Label>
                                    <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
                                        {sizeArray.map((size) => (
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
                                                            ? "ring-2 ring-indigo-500"
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
                                                                        ? "border-indigo-500"
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

                            <button
                                type="submit"
                                className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Add to bag
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export async function getServerSideProps({ params }: ProductDetailsParamsType) {
    const { data } = await getProduct(params.slug);
    return {
        props: {
            product: data,
        },
    };
}

export default ProductDetails;
