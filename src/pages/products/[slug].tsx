import { useState, useEffect } from "react";
import _ from "lodash";
import { toast } from "react-hot-toast";
import { useStoreContext } from "@/lib/contexts/StoreContextProvider";
import { addToWishList, getWishList, removeWishList } from "@/api/user";
import { IProduct } from "../../../types/product.type";
import { StoreActionType } from "@/lib/states/storeReducer/storeReducer.type";
import CardZoomCarousel from "@/components/Card/CardZoomCarousel";
import { useRouter } from "next/router";
import { getProduct } from "@/api/products";
import ProductDetailsTab from "../../components/Product/ProductDetailsTab";
import ProductInfo from "@/components/Product/ProductInfo/ProductInfo";
import MainLayout from "@/layouts/MainLayout/MainLayout";

type ProductDetailsParamsType = {
    params: {
        slug: string;
    };
};

const colorArray = ["Green", "White", "Black", "Rose"];
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
const ProductDetails = ({ product }: { product: IProduct }) => {
    const [selectedColor, setSelectedColor] = useState<string>("");
    const [selectedSize, setSelectedSize] = useState<string>("");
    const [heartFillIcon, setHeartFillIcon] = useState(false);
    const [tooltipTitle, setTooltipTitle] = useState("Add to Cart");
    const { title, images, _id } = product;
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
        <MainLayout>
            <div className="bg-white container">
                <div className="grid grid-cols-2 sm:grid-cols-1 pt-6">
                    {/* Image gallery */}
                    <div className="z-10">
                        {product &&
                        title &&
                        product.images &&
                        product.images.length ? (
                            <CardZoomCarousel images={images} title={title} />
                        ) : (
                            <h2>No Image On The Product</h2>
                        )}
                    </div>

                    {/* Product info */}
                    <div className="mx-auto max-w-7xl relative">
                        <ProductInfo
                            product={product}
                            colorArray={colorArray}
                            sizeArray={sizeArray}
                            selectedColor={selectedColor}
                            setSelectedColor={setSelectedColor}
                            selectedSize={selectedSize}
                            setSelectedSize={setSelectedSize}
                        />
                    </div>
                </div>

                {/* Product Details Tab */}
                <div className="mt-10">
                    <ProductDetailsTab product={product} />
                </div>
            </div>
        </MainLayout>
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
