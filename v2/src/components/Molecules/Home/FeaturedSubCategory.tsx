import Image from "next/image";
import React from "react";

interface FeaturedSubCategoryProps {
    data: {
        id: number;
        category_image_url: string;
        category_name: string;
    };
}

const FeaturedSubCategory: React.FC<FeaturedSubCategoryProps> = ({ data }) => {
    return (
        <div
            className="flex flex-col items-center justify-center bg-white px-2 py-3 shadow-md border cursor-pointer group transition-all  min-h-[145px]"
        >
            <Image
                className="max-w-[50px] max-h-[60px]"
                src={data.category_image_url}
                alt=""
                width={100}
                height={100}
            />
            <p className="mt-3 text-center text-[#01132d] font-semibold group-hover:text-green-400 transition-all">
                {data.category_name}
            </p>
        </div>
    );
};

export default FeaturedSubCategory;
