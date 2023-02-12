import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ICategories } from "types/category.type";

const Category = ({ category }: { category: ICategories }) => {
    const { slug, name } = category;
    return (
        <Link href={`/category/${slug}`}>
            <div className="max-w-sm cursor-pointer bg-white border border-gray-200 rounded-lg drop-shadow-xl p-4">
                <div className="flex justify-between mb-3">
                    <h3 className="text-2xl text-primary font-semibold">
                        {name}
                    </h3>
                    <Link
                        href={`/category/${slug}`}
                        className="text-sm transition-all text-primary font-normal mt-2 hover:text-green-400"
                    >
                        See More
                    </Link>
                </div>
                <div className="grid grid-cols-2 gap-1 ">
                    <div className="border-2 border-green-400">
                        <Image
                            src={"/docs/images/blog/image-4.jpg"}
                            alt="abc"
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="border-2 border-green-400">
                        <Image
                            src={"/docs/images/blog/image-4.jpg"}
                            alt="abc"
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="border-2 border-green-400">
                        <Image
                            src={"/docs/images/blog/image-4.jpg"}
                            alt="abc"
                            width={120}
                            height={120}
                        />
                    </div>
                    <div className="border-2 border-green-400">
                        <Image
                            src={"/docs/images/blog/image-4.jpg"}
                            alt="abc"
                            width={120}
                            height={120}
                        />
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default Category;
