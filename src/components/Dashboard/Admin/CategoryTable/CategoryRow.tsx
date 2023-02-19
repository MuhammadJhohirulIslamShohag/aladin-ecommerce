import React from "react";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { ICategories } from "./../../../../../types/category.type";
import Link from "next/link";

type CategoryRowPropType = {
    category: ICategories;
    handleRemoveCategory: (slug:string) => void;
}
const CategoryRow = (props: CategoryRowPropType) => {
    const {category,handleRemoveCategory} = props;
    const { images, name, slug } = category;
    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="p-4">
                {images?.map((image) => (
                    <Image
                        key={image.public_id}
                        width={100}
                        height={100}
                        src={image?.url}
                        alt="Apple Watch"
                        className="w-10 h-10 p-1 rounded-full ring-2 ring-green-300"
                    />
                ))}
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">{name}</td>
            <th scope="col" className="px-6 py-3">
                <div className="flex items-center justify-start space-x-5">
                    <h2 onClick={() => handleRemoveCategory(slug)}>
                        <MdDeleteOutline className="text-red-500 text-xl hover:text-red-700 transition-all cursor-pointer" />
                    </h2>
                    <Link href={`/dashboard/admin/categories/${slug}`}>
                        <AiOutlineEdit className="text-green-400 text-lg  hover:text-green-700 transition-all cursor-pointer" />
                    </Link>
                </div>
            </th>
        </tr>
    );
};

export default CategoryRow;
