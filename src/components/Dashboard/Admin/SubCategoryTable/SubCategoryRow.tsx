import React from "react";
import Image from "next/image";
import { AiOutlineEdit } from "react-icons/ai";
import { MdDeleteOutline } from "react-icons/md";
import { ISubCategories } from "types/sub-category.type";

type SubCategoryRowPropType = {
    subCategory: ISubCategories;
    handleRemoveSubCategory: (slug: string) => void;
    handleEditSubCategory: (slug: string) => void;
};
const SubCategoryRow = (props: SubCategoryRowPropType) => {
    const { subCategory, handleRemoveSubCategory, handleEditSubCategory } =
        props;
    const { name, slug, parent, images } = subCategory;

    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="px-6 py-4 font-semibold text-gray-900 ">
                <td className="px-6 py-4  font-semibold text-gray-900 ">
                    {images?.length &&
                        images?.map(
                            (image: { url: string; public_id: string }) => (
                                <Image
                                    key={image.public_id}
                                    width={100}
                                    height={100}
                                    src={image?.url}
                                    alt={name}
                                    className="w-10 h-10 inline-block p-1 rounded-full ring-2 ring-green-300"
                                />
                            )
                        )}
                </td>
            </td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">{name}</td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">
                {parent?.name}
            </td>
            <td className="px-6 py-3 flex items-center h-52 justify-start space-x-3">
                <h2 onClick={() => handleRemoveSubCategory(slug)}>
                    <MdDeleteOutline className="text-red-500 text-xl hover:text-red-700 transition-all cursor-pointer" />
                </h2>
                <label
                    htmlFor="my-custom-modal"
                    onClick={() => handleEditSubCategory(slug)}
                >
                    <AiOutlineEdit className="text-green-400 text-lg  hover:text-green-700 transition-all cursor-pointer" />
                </label>
            </td>
        </tr>
    );
};

export default SubCategoryRow;
