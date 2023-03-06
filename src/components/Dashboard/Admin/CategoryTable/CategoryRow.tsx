import React from "react";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { ICategories } from "./../../../../../types/category.type";

type CategoryRowPropType = {
    category: ICategories;
    handleRemoveCategory: (slug: string) => void;
    handleEditCategory: (slug: string) => void;
};
const CategoryRow = (props: CategoryRowPropType) => {
    const { category, handleRemoveCategory, handleEditCategory } = props;
    const { name, slug, images } = category;

    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="px-6 py-4 font-semibold text-gray-900 ">{name}</td>
            <td className="px-6 py-4  font-semibold text-gray-900 ">
                {images?.length &&
                    images?.map((image) => (
                        <Image
                            key={image.public_id}
                            width={100}
                            height={100}
                            src={image?.url}
                            alt={name}
                            className="w-10 h-10 inline-block p-1 rounded-full ring-2 ring-green-300"
                        />
                    ))}
            </td>
            <td className="px-6 py-3 flex items-center justify-start space-x-3">
                <h2 onClick={() => handleRemoveCategory(slug)}>
                    <MdDeleteOutline className="text-red-500 text-xl hover:text-red-700 transition-all cursor-pointer" />
                </h2>
                <label
                    htmlFor="my-custom-modal"
                    onClick={() => handleEditCategory(slug)}
                >
                    <AiOutlineEdit className="text-green-400 text-lg  hover:text-green-700 transition-all cursor-pointer" />
                </label>
            </td>
        </tr>
    );
};

export default CategoryRow;
