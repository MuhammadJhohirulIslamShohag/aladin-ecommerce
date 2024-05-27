"use client"

import Link from "next/link";
import { ISubCategory } from "@/types/sub-category.type";

const SubCategory = ({ subCategory }: { subCategory: ISubCategory }) => {
    const { name, imageURL } = subCategory;

    return (
        <Link href={`/sub-category/${name}`}>
            <div
                className="h-80 md:h-56 sm:h-52 px-5 w-full bg-cover flex items-center md:items-center sm:items-center justify-center relative bg-no-repeat bg-center after:content-[''] after:bg-primary after:h-full after:opacity-40 after:absolute after:top-0 after:left-0 after:w-full  md:bg-center rounded-lg after:rounded-lg hover:shadow-xl transition ease-in-out delay-30 cursor-pointer"
                style={{
                    backgroundImage: `url(${imageURL})`,
                }}
            >
                <h3 className="text-white bottom-8 md:bottom-0 sm:bottom-0 text-3xl z-30 relative text-center font-bold">
                    {name}
                </h3>
            </div>
        </Link>
    );
};

export default SubCategory;
