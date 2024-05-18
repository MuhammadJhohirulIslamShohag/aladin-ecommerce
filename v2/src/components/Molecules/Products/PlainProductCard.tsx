"use client";

import Link from "next/link";

import numberWithCommas from "@/utils/numberWithCommas";
import ValidateImage from "../../Atoms/ValidateImage";
import { IProduct } from "@/types/product.type";

const PlainProductCard: React.FC<{ data: IProduct }> = ({ data }) => {
    const discountPrice = Math.ceil(data?.price * (data?.discount / 100));
    const netPrice = Math.ceil(data?.price - discountPrice);

    return (
        <div className="relative group w-full transition py-3.5 mx-auto bg-white shadow-lg lg:flex grid grid-cols-1 lg:grid-cols-2 lg:h-[85px] xl:h-[85px] border-b-2 border-green-50">
            <div className="overflow-hidden px-5">
                <div className="relative hover:scale-110 duration-500">
                    <Link href={`/products/${data?.slug}`}>
                        <ValidateImage
                            imageUrl={
                                data?.imageURLs?.[0] ||
                                "https://cdn.thewirecutter.com/wp-content/media/2023/06/businesslaptops-2048px-0943.jpg"
                            }
                            className="mx-auto transition-all duration-500 xl:w-[110px] w-full lg:max-h-[60px] max-h-[120px]"
                            alt={data?.name}
                        />
                    </Link>
                </div>
            </div>
            <div className="relative">
                <Link
                    className="text-secondary mt-2 p-"
                    href={`/products/${data?.slug}`}
                >
                    <h3 className="font-bold mb-[4px] hover:text-primary duration-300 hover:underline px-5">
                        {data?.name?.length && data?.name?.length > 16
                            ? data?.name.slice(0, 16) + "..."
                            : data?.name}
                    </h3>
                    <div className="px-5">
                        <div className="flex gap-3">
                            <span className="text-primary">
                                ৳ {numberWithCommas(netPrice)}
                            </span>
                            {data?.price && (
                                <span className="line-through">
                                    ৳ {numberWithCommas(data?.price)}
                                </span>
                            )}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default PlainProductCard;
