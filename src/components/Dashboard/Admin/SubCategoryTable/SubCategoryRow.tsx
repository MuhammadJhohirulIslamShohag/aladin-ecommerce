import React from "react";
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
    const { name, slug, parent } = subCategory;

    return (
        <tr className="bg-white border-b hover:bg-gray-50 ">
            <td className="px-6 py-4 font-semibold text-gray-900 ">{name}</td>
            <td className="px-6 py-4 font-semibold text-gray-900 ">
                {parent?.name}
            </td>
            <th
                scope="col"
                className="px-6 py-3 flex items-center justify-start space-x-3"
            >
                <label onClick={() => handleRemoveSubCategory(slug)}>
                    <MdDeleteOutline className="text-red-500 text-xl hover:text-red-700 transition-all cursor-pointer" />
                </label>
                <label
                    htmlFor="my-custom-modal"
                    onClick={() => handleEditSubCategory(slug)}
                >
                    <AiOutlineEdit className="text-green-400 text-lg  hover:text-green-700 transition-all cursor-pointer" />
                </label>
            </th>
        </tr>
    );
};

export default SubCategoryRow;
